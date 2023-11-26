import { z } from 'zod'
// Student have to take exact three courses, no open credit
const semesterSubject = z.object({
  studentId: z.number().positive(),
  courses: z.string().array().length(3),
})

try {
  const student1 = semesterSubject.parse({
    studentId: 1,
    courses: ['Python', 'DLD', 'Java'],
  })
  console.log(student1)
} catch (err) {
  if (err instanceof z.ZodError) {
    console.log(err.issues)
  } else {
    console.log(err)
  }
}
