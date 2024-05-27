const express = require("express");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = express();
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());

// async function countOnlineMembers() {
//   const onlineMembers = await prisma.signUp.count({
//     where: {
//       loggedOut: { lt: prisma.signUp.createdAt },
//     },
//   });
//   console.log("online", onlineMembers);
// }
// countOnlineMembers();
// async function countOfflineMembers() {
//   const offlineMembers = await prisma.signUp.count({
//     where: {
//       loggedOut: { gt: prisma.signUp.createdAt },
//     },
//   });
//   console.log("offline", offlineMembers);
// }
// countOfflineMembers();
async function checkOnlineUsers() {
  const onlineUsers = await prisma.$queryRaw`
  SELECT *
  FROM SignUp
  WHERE TIMESTAMPDIFF(HOUR, loggedOut, createdAt) < 1 AND  createdAt > loggedOut;
`;

  console.log(onlineUsers);
}
checkOnlineUsers();
async function checkOfflineUsers() {
  const OfflineUsers = await prisma.$queryRaw`
  SELECT *
  FROM SignUp
  WHERE TIMESTAMPDIFF(HOUR, loggedOut, createdAt) < 1 AND  loggedOut > createdAt;
`;
  console.log(OfflineUsers);
}
checkOfflineUsers();
async function checkAwayUsers() {
  const awayUsers = await prisma.$queryRaw`
  SELECT *
  FROM SignUp
  WHERE TIMESTAMPDIFF(HOUR, loggedOut, createdAt) > 2 AND  createdAt > loggedOut;
`;

  console.log(awayUsers);
}
checkAwayUsers();
app.post("/createUser", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Name, email, and password are required" });
  }

  try {
    const existingUser = await prisma.SignUp.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ error: "User with this email already exists" });
    }
    const newUser = await prisma.SignUp.create({
      data: { name, email, password },
    });
    return res.json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
app.post("/login", async (req, res) => {
  const { name } = req.body;

  try {
    const user = await prisma.SignUp.findUnique({
      where: { email: name },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const updatedUser = await prisma.SignUp.update({
      where: { id: user.id },
      data: { createdAt: new Date() },
    });
    return res.json(updatedUser);
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
app.post("/logout", async (req, res) => {
  const { userId } = req.body;
  console.log(userId);

  try {
    const updatedUser = await prisma.SignUp.update({
      where: { id: userId },
      data: { loggedOut: new Date() },
    });

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating loggedOut:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
