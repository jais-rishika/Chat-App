import { ChatCircleDots, Users, Phone ,Image, Sticker, Camera ,User ,File } from "phosphor-react";
import { faker } from "@faker-js/faker";

const Profile_Options = [
  {
    title: "Edit Profile",
  },
  {
    title: "Logout",
  },
];

const Action_Buttons = [
  {
    color: "#4da5fe",
    icon: <Image size={24} />,
    y: 102,
    title: "Photo/Video",
  },
  {
    color: "#1b8cfe",
    icon: <Sticker size={24} />,
    y: 172,
    title: "Stickers",
  },
  {
    color: "#0172e4",
    icon: <Camera size={24} />,
    y: 242,
    title: "Image",
  },
  {
    color: "#0159b2",
    icon: <File size={24} />,
    y: 312,
    title: "Document",
  },
  {
    color: "#013f7f",
    icon: <User size={24} />,
    y: 382,
    title: "Contact",
  },
];

const Message_options = [
  {
    title: "Reply",
  },
  {
    title: "React to message",
  },
  {
    title: "Forward message",
  },
  {
    title: "Star message",
  },
  {
    title: "Report",
  },
  {
    title: "Delete Message",
  },
];

const NavButton = [
  {
    index: 0,
    icon: <ChatCircleDots></ChatCircleDots>,
  },
  {
    index: 1,
    icon: <Users></Users>,
  },
  {
    index: 2,
    icon: <Phone></Phone>,
  },
];

const ChatList = [
    {
      id: 0,
      img: faker.image.avatar(),
      name: faker.person.firstName(),
      msg: faker.music.songName(),
      time: "4:50",
      unread: 0,
      pinned: true,
      online: true,
    },
    {
      id: 1,
      img: faker.image.avatar(),
      name: faker.person.firstName(),
      msg: faker.music.songName(),
      time: "6:40",
      unread: 2,
      pinned: true,
      online: false,
    },
    {
      id: 2,
      img: faker.image.avatar(),
      name: faker.person.firstName(),
      msg: faker.music.songName(),
      time: "12:10",
      unread: 5,
      pinned: false,
      online: true,
    },
    {
      id: 3,
      img: faker.image.avatar(),
      name: faker.person.firstName(),
      msg: faker.music.songName(),
      time: "2:00",
      unread: 1,
      pinned: false,
      online: false,
    },
    {
      id: 4,
      img: faker.image.avatar(),
      name: faker.person.firstName(),
      msg: faker.music.songName(),
      time: "10:50",
      unread: 0,
      pinned: true,
      online: true,
    },
    {
      id: 5,
      img: faker.image.avatar(),
      name: faker.person.firstName(),
      msg: faker.music.songName(),
      time: "7:00",
      unread: 10,
      pinned: false,
      online: true,
    },
    {
      id: 6,
      img: faker.image.avatar(),
      name: faker.person.firstName(),
      msg: faker.music.songName(),
      time: "8:00",
      unread: 0,
      pinned: false,
      online: false,
    },
    {
      id: 7,
      img: faker.image.avatar(),
      name: faker.person.firstName(),
      msg: faker.music.songName(),
      time: "3:15",
      unread: 0,
      pinned: false,
      online: false,
    },
    {
      id: 8,
      img: faker.image.avatar(),
      name: faker.person.firstName(),
      msg: faker.music.songName(),
      time: "3:15",
      unread: 0,
      pinned: false,
      online: false,
    },
    {
      id: 9,
      img: faker.image.avatar(),
      name: faker.person.firstName(),
      msg: faker.music.songName(),
      time: "3:45",
      unread: 10,
      pinned: false,
      online: true,
    },
    {
      id: 10,
      img: faker.image.avatar(),
      name: faker.person.firstName(),
      msg: faker.music.songName(),
      time: "3:00",
      unread: 0,
      pinned: false,
      online: false,
    },

  ];
  
  const Chat_History = [
    {
      type: "msg",
      message: "Hi 👋🏻, How are ya ?",
      incoming: true,
      outgoing: false,
    },
    {
      type: "divider",
      text: "Today",
    },
    {
      type: "msg",
      message: "Hi 👋 Panda, not bad, u ?",
      incoming: false,
      outgoing: true,
    },
    {
      type: "msg",
      message: "Can you send me an abstarct image?",
      incoming: false,
      outgoing: true,
    },
    {
      type: "msg",
      message: "Ya sure, sending you a pic",
      incoming: true,
      outgoing: false,
    },
  
    {
      type: "msg",
      subtype: "img",
      message: "Here You Go",
      img: faker.image.urlLoremFlickr (),
      incoming: true,
      outgoing: false,
    },
    {
      type: "msg",
      message: "Can you please send this in file format?",
      incoming: false,
      outgoing: true,
    },
  
    {
      type: "msg",
      subtype: "doc",
      message: "Yes sure, here you go.",
      incoming: true,
      outgoing: false,
    },
    {
      type: "msg",
      subtype: "link",
      preview: faker.image.urlLoremFlickr({ category: 'cats' }),
      message: "Yep, I can also do that",
      incoming: true,
      outgoing: false,
    },
    {
      type: "msg",
      subtype: "reply",
      reply: "This is a reply",
      message: "Yep, I can also do that",
      incoming: false,
      outgoing: true,
    },
  ];
  
export {ChatList, Chat_History, NavButton ,Message_options, Action_Buttons ,Profile_Options};