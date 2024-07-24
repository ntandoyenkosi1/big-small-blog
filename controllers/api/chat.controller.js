const { Chat, User } = require("../../models");
const router = require("express").Router();

// router.put("/:id/like", async (req, res) => {
//   let existingChat = await Chat.findOne({ where: { id: req.params.id } });
//   Chat.update(
//     { likes: existingChat.likes + 1 },
//     { where: { id: req.params.id } }
//   )
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((err) => {
//       res.status(401).json(err);
//     });
// });
// router.put("/:id", (req, res) => {
//   Chat.update(req.body, { where: { id: req.params.id } })
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((err) => {
//       res.status(401).json(err);
//     });
// });
// router.get("/:id", (req, res) => {
//   Chat.findByPk(req.params.id)
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((err) => {
//       res.status(400).json(err);
//     });
// });
// router.get("/:id", (req, res) => {
//   Chat.findByPk(req.params.id)
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((err) => {
//       res.status(400).json(err);
//     });
// });
// create Chat
router.post("/:senderId/:receiverId", (req, res) => {
  const { senderId, receiverId } = req.params;
  const userId = req.session?.user?.id == senderId ? receiverId : senderId;
  //const user=User.findByPk(user)
  Chat.create({
    ...req.body,
    User1: req.session?.user?.id,
    User2: userId,
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});
router.get("/:senderId/:receiverId", (req, res) => {
  const { senderId, receiverId } = req.params;
  //const userId = req.session.user.id == senderId ? receiverId : senderId;
  //const user=User.findByPk(user)
  Chat.findAll({ where: { User1: senderId, User2: receiverId } })
    .then((data) => {
      Chat.findAll({ where: { User1: receiverId, User2: senderId } })
        .then((data1) => {
          res.json(
            [...data, ...data1].sort((a, b) => a.createdAt - b.createdAt)
          );
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json(err);
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});
// router.delete("/:id", (req, res) => {
//   Chat.destroy(req.params.id)
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((err) => {
//       res.status(400).json(err);
//     });
// });
module.exports = router;
