import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-ccb86954/health", (c) => {
  return c.json({ status: "ok" });
});

// Initialize default data
app.post("/make-server-ccb86954/init", async (c) => {
  try {
    const existing = await kv.get("initialized");
    if (existing) {
      return c.json({ message: "Already initialized" });
    }

    // Admin password (default)
    await kv.set("admin_password", "admin123"); // User should change this immediately

    // Logo URL
    await kv.set("logo_url", "");

    // Landing page
    await kv.set("landing_page", {
      welcomeText: "Welcome to Refiners Team",
      subtext1: "We try to aid juniors academically by providing direct contact and resources",
      subtext2: "Having trouble with your studies? Feel free to join and contact our socials for 1:1 guidance"
    });

    // Contacts
    await kv.set("contacts", [
      {
        id: "1",
        photo: "",
        name: "Nijum Chakma",
        education: "HSC-27 Rangamati Govt. College, Rangamati, GPA-5 SSC-25 RGHS",
        subjects: "Math(GM+HM), English, BGS",
        bio: "Be your own light in darkness, pain, confusion and sorrow",
        socials: [
          { platform: "email", link: "nijum@example.com", username: "nijum@example.com" },
          { platform: "facebook", link: "https://facebook.com", username: "Nijum Chakma" },
          { platform: "instagram", link: "https://instagram.com", username: "@nijum" },
          { platform: "whatsapp", link: "https://wa.me/", username: "+1234567890" },
          { platform: "twitter", link: "https://twitter.com", username: "@nijum" },
          { platform: "discord", link: "https://discord.com", username: "nijum#1234" }
        ],
        mostAvailableOn: "whatsapp",
        bestAt: "Mathematics and Problem Solving"
      }
    ]);

    // Notices
    await kv.set("notices", [
      {
        id: "1",
        date: "January 13, 2026",
        title: "New Study Sessions Available",
        preview: "We're hosting group study sessions every weekend. Sign up through our contact channels!",
        fullContent: "We're excited to announce new group study sessions every weekend! These sessions cover various subjects including Mathematics, Physics, and Computer Science. Sign up through our contact channels to reserve your spot. Limited seats available!",
        images: []
      },
      {
        id: "2",
        date: "January 10, 2026",
        title: "Updated Resource Library",
        preview: "New materials added for Mathematics and Physics. Check the resources section below!",
        fullContent: "Our resource library has been updated with comprehensive new materials for Mathematics and Physics. These include practice problems, solution guides, and interactive tutorials. Access them in the resources section!",
        images: []
      }
    ]);

    // Resources
    await kv.set("resources", [
      {
        id: "1",
        icon: "Calculator",
        title: "Mathematics",
        description: "Comprehensive guides for Algebra, Calculus, and Statistics",
        items: ["Algebra Basics", "Calculus I & II", "Linear Algebra", "Statistics"]
      },
      {
        id: "2",
        icon: "Atom",
        title: "Physics",
        description: "Study materials for Mechanics, Electromagnetism, and Quantum",
        items: ["Classical Mechanics", "Electromagnetism", "Thermodynamics", "Quantum Physics"]
      },
      {
        id: "3",
        icon: "Code",
        title: "Computer Science",
        description: "Programming tutorials, algorithms, and data structures",
        items: ["Python Basics", "Data Structures", "Algorithms", "Web Development"]
      }
    ]);

    // Footer
    await kv.set("footer", {
      about: "Empowering students through collaborative learning and dedicated mentorship. Together, we refine knowledge and build futures.",
      email: "contact@refinersteam.com",
      phone: "+1 (555) 123-4567",
      socials: [
        { platform: "instagram", link: "https://instagram.com" },
        { platform: "twitter", link: "https://twitter.com" }
      ]
    });

    // About Modal
    await kv.set("about_modal", {
      story: "Refiners Team was founded by a group of passionate students who recognized the challenges that juniors face in their academic journey. We believe that every student deserves access to quality guidance and resources, regardless of their background.",
      goals: [
        "Provide personalized 1:1 guidance to students struggling with their coursework",
        "Build a comprehensive library of academic resources accessible to all",
        "Foster a collaborative learning environment where peers help peers",
        "Keep students informed with important academic notices and updates"
      ],
      highlights: [
        { label: "Students Helped", value: "500+" },
        { label: "Resources Shared", value: "50+" },
        { label: "Active Mentors", value: "15+" }
      ],
      gallery: []
    });

    // Contact directory instructions
    await kv.set("contact_instructions", "How to use: Contact any of us through our socials or join our Facebook Group to discuss anything regarding studies, homeworks, exams or anything else. Feel free to engage, we welcome everyone with open arms.");

    await kv.set("initialized", true);

    return c.json({ message: "Initialized successfully" });
  } catch (error) {
    console.error("Initialization error:", error);
    return c.json({ error: String(error) }, 500);
  }
});

// Admin Login
app.post("/make-server-ccb86954/admin/login", async (c) => {
  try {
    const { password } = await c.req.json();
    const storedPassword = await kv.get("admin_password");
    
    if (password === storedPassword) {
      return c.json({ success: true });
    } else {
      return c.json({ success: false, error: "Invalid password" }, 401);
    }
  } catch (error) {
    console.error("Login error:", error);
    return c.json({ error: String(error) }, 500);
  }
});

// Change Admin Password
app.post("/make-server-ccb86954/admin/change-password", async (c) => {
  try {
    const { currentPassword, newPassword } = await c.req.json();
    const storedPassword = await kv.get("admin_password");
    
    if (currentPassword !== storedPassword) {
      return c.json({ success: false, error: "Current password is incorrect" }, 401);
    }
    
    await kv.set("admin_password", newPassword);
    return c.json({ success: true });
  } catch (error) {
    console.error("Change password error:", error);
    return c.json({ error: String(error) }, 500);
  }
});

// GET endpoints
app.get("/make-server-ccb86954/logo", async (c) => {
  try {
    const data = await kv.get("logo_url");
    return c.json({ logoUrl: data || "" });
  } catch (error) {
    console.error("Get logo error:", error);
    return c.json({ logoUrl: "" });
  }
});

app.get("/make-server-ccb86954/landing", async (c) => {
  try {
    const data = await kv.get("landing_page");
    return c.json(data || {
      welcomeText: "Welcome to Refiners Team",
      subtext1: "We try to aid juniors academically by providing direct contact and resources",
      subtext2: "Having trouble with your studies? Feel free to join and contact our socials for 1:1 guidance"
    });
  } catch (error) {
    console.error("Get landing error:", error);
    return c.json({
      welcomeText: "Welcome to Refiners Team",
      subtext1: "We try to aid juniors academically by providing direct contact and resources",
      subtext2: "Having trouble with your studies? Feel free to join and contact our socials for 1:1 guidance"
    });
  }
});

app.get("/make-server-ccb86954/contacts", async (c) => {
  try {
    const data = await kv.get("contacts");
    return c.json(data || []);
  } catch (error) {
    console.error("Get contacts error:", error);
    return c.json([]);
  }
});

app.get("/make-server-ccb86954/contact-instructions", async (c) => {
  try {
    const data = await kv.get("contact_instructions");
    return c.json({ instructions: data || "" });
  } catch (error) {
    console.error("Get contact instructions error:", error);
    return c.json({ instructions: "" });
  }
});

app.get("/make-server-ccb86954/notices", async (c) => {
  try {
    const data = await kv.get("notices");
    return c.json(data || []);
  } catch (error) {
    console.error("Get notices error:", error);
    return c.json([]);
  }
});

app.get("/make-server-ccb86954/resources", async (c) => {
  try {
    const data = await kv.get("resources");
    return c.json(data || []);
  } catch (error) {
    console.error("Get resources error:", error);
    return c.json([]);
  }
});

app.get("/make-server-ccb86954/footer", async (c) => {
  try {
    const data = await kv.get("footer");
    return c.json(data || {});
  } catch (error) {
    console.error("Get footer error:", error);
    return c.json({});
  }
});

app.get("/make-server-ccb86954/about", async (c) => {
  try {
    const data = await kv.get("about_modal");
    return c.json(data || {});
  } catch (error) {
    console.error("Get about error:", error);
    return c.json({});
  }
});

// UPDATE endpoints
app.put("/make-server-ccb86954/logo", async (c) => {
  const body = await c.req.json();
  await kv.set("logo_url", body.logoUrl);
  return c.json({ success: true });
});

app.put("/make-server-ccb86954/landing", async (c) => {
  const body = await c.req.json();
  await kv.set("landing_page", body);
  return c.json({ success: true });
});

app.put("/make-server-ccb86954/contacts", async (c) => {
  const body = await c.req.json();
  await kv.set("contacts", body);
  return c.json({ success: true });
});

app.put("/make-server-ccb86954/contact-instructions", async (c) => {
  const body = await c.req.json();
  await kv.set("contact_instructions", body.instructions);
  return c.json({ success: true });
});

app.put("/make-server-ccb86954/notices", async (c) => {
  const body = await c.req.json();
  await kv.set("notices", body);
  return c.json({ success: true });
});

app.put("/make-server-ccb86954/resources", async (c) => {
  const body = await c.req.json();
  await kv.set("resources", body);
  return c.json({ success: true });
});

app.put("/make-server-ccb86954/footer", async (c) => {
  const body = await c.req.json();
  await kv.set("footer", body);
  return c.json({ success: true });
});

app.put("/make-server-ccb86954/about", async (c) => {
  const body = await c.req.json();
  await kv.set("about_modal", body);
  return c.json({ success: true });
});

Deno.serve(app.fetch);