const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/mongoosecrud", { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB!"))
  .catch(err => console.log("Opps! Couldn't Connect to MongoDB!"));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Django",
    author: "Mosh",
    tags: ["Python", "Backend"],
    isPublished: true
  });
  const result = await course.save();
  console.log(result);
}
// createCourse();

/**
 ## Comparison & logical Oparator for Mongoose ##
 * $eq = for Equal
 * $ne = for Not Equal
 * $gt = for Greater Than
 * $gte = for greater than or equal
 * $lt = for less than
 * $lte = for less than or equal
 * $in = for In the document or in
 * $nin = for Not in
 * or = for or logical
 * and = for and logical
 * Regular Expression to find the value
 * Word Start With Hasib => find({author: /^Hasib/})
 * Word Ends With Hasib => find({author: /Hasib$/i}) i for case-sensitive
* Words Contain anywhere => find({author: /.*Hasib.* /i})
 */
async function getCourse() {
  // Pagination
  //const pageNumber = 2;
  //const pageSize = 10;
  const courses = await Course.find()
    //.find({ price: { $in: [10, 20, 30] } })
    //.find({ price: { $gte: 10, $lte: 20 } })
    //.or([{ author: "Mosh" }, { isPublished: false }])
    //.and([])
    //.skip((pageNumber - 1) * pageSize)
    //.limit(pageSize)
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1 });
  //.count(); getting the total number of data
  console.log(courses);
}
//getCourse();

async function updateCourseQueryFirst(id) {
  const course = await Course.findById(id);
  if (!course) return "Course not found";

  /*  course.isPublished = true;
  course.author = "Masum"; */

  course.set({
    isPublished: true,
    author: "Osman"
  });
  const result = await course.save();
  console.log(result);
}
//updateCourseQueryFirst("5c6be91f200da943380b033e");

async function updateCourse(id) {
  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: { author: "Hasib", isPublished: false }
    },
    { new: true }
  );

  console.log(course);
}
//updateCourse("5c6be91f200da943380b033e");
async function deleteCourse(id) {
  const course = await Course.findByIdAndDelete(id);
  console.log(course);
}
deleteCourse("5c6bebdcf02ba85f8068b834");
