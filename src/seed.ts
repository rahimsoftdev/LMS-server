import { connectDB, disconnectDB } from './config/db.js'
import { env } from './config/env.js'
import { courseSeeds, lectureSeeds } from './data/seed-data.js'
import { CourseModel } from './models/course.model.js'
import { LectureModel } from './models/lecture.model.js'

async function seed(): Promise<void> {
  try {
    await connectDB(env.mongoUri)

    await Promise.all([CourseModel.deleteMany({}), LectureModel.deleteMany({})])

    const [courses, lectures] = await Promise.all([
      CourseModel.insertMany(courseSeeds, { timestamps: false }),
      LectureModel.insertMany(lectureSeeds, { timestamps: false }),
    ])

    console.log(
      `Seeded ${courses.length} courses and ${lectures.length} lectures`,
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error(`Seeding failed: ${message}`)
    process.exitCode = 1
  } finally {
    await disconnectDB()
  }
}

void seed()
