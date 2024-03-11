import User from "../models/user";
import Course from "../models/course";
import queryString from "query-string";
const stripe = require("stripe")(process.env.STRIPE_SECRET);

export const currentAdmin = async (req, res) => {
  try {
    let user = await User.findById(req.user._id).select("-password").exec();
    // console.log("CURRENT INSTRUCTOR => ", user);
    if (!user.role.includes("Admin")) {
      return res.sendStatus(403);
    } else {
      res.json({ ok: true });
    }
  } catch (err) {
    console.log(err);
  }
};

export const allCourses = async (req, res) => {
  try {
    const courses = await Course.find({})
      .sort({ createdAt: -1 })
      .populate("instructor", "name")
      .exec();
    res.json(courses);
  } catch (err) {
    console.log(err);
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { slug } = req.params;

    console.log("req.body => ", req.body);

    const updated = await Course.findOneAndUpdate({ slug }, req.body, {
      new: true
    }).exec();

    res.json(updated);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err.message);
  }
};

export const publishCourse = async (req, res) => {
  try {
    const { slug } = req.params;

    const toUpdate = await Course.findOne({ slug }).exec();

    toUpdate.published = !toUpdate.published;

    await toUpdate.save();

    res.json(toUpdate);
  } catch (err) {
    console.log("err => ", err);
    return res.status(400).send(err);
  }
};

export const blockUser = async (req, res) => {
  try {
    const { id } = req.params;
    const toUpdate = await User.findById(id).exec();
    toUpdate.blocked = !toUpdate.blocked;
    await toUpdate.save();
    res.json(toUpdate);
  } catch (err) {
    console.log("err => ", err);
    return res.status(400).send(err);
  }
};

export const allStudents = async (req, res) => {
  try {
    const users = await User.find({ role: "Subscriber" })
      .populate({
        path: "courses",
        select: "name image paid slug published",
        populate: {
          path: "instructor",
          select: "name"
        }
      })
      .exec();

    // Filter out the users which has role of instructor
    // const students = users.filter((user) => !user.role.includes("Instructor"));

    res.json(users);
  } catch (err) {
    console.log(err);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await User.findByIdAndUpdate(id, req.body, {
      new: true
    }).exec();

    res.json(updated);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err.message);
  }
};

export const allInstructors = async (req, res) => {
  try {
    const users = await User.find({ role: "Instructor" })
      .populate({
        path: "courses",
        select: "name image paid slug published",
        populate: {
          path: "instructor",
          select: "name"
        }
      })
      .exec();

    const courses = await Course.find({})
      .sort({ createdAt: -1 })
      .populate({
        path: "instructor",
        select: "name _id"
      })
      .exec();

    res.json({ users, courses });
  } catch (err) {
    console.log(err);
  }
};
