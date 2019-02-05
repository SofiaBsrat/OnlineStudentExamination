const {from} = require('rxjs');
let Student = require('../models/student');

class StudentService {
    constructor() {

    }

    add(studentObj) {
        let newStudent = new Student(studentObj);
        return newStudent.save();

    }

    get(queryObj) {
        return from(Student.find(queryObj));
    }

    update(queryObj, studentObj) {

    }

    delete(queryObj) {}
}

module.exports = StudentService;