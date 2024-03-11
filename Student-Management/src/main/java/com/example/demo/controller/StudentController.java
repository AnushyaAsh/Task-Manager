package com.example.demo.controller;

import com.example.demo.exception.StudentNotFoundException;
import com.example.demo.model.Student;
import com.example.demo.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @PostMapping("/addstudent")
    Student newStudent(@RequestBody Student newStudent) {
        return studentRepository.save(newStudent);
    }

    @GetMapping("/liststudent")
    List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @GetMapping("/student/{id}")
    Student getStudentById(@PathVariable Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new StudentNotFoundException(id));
    }

    @PutMapping("/updatestudent/{id}")
    Student updateStudent(@RequestBody Student newStudent, @PathVariable Long id) {
        return studentRepository.findById(id)
                .map(student -> {
                	student.setName(newStudent.getName());
         	        student.setStandard(newStudent.getStandard());
         	        student.setDob(newStudent.getDob());
         	        student.setGuardianname(newStudent.getGuardianname());
         	       student.setAddress(newStudent.getAddress());
         	        return studentRepository.save(student);
                }).orElseThrow(() -> new StudentNotFoundException(id));
    }

    @DeleteMapping("/deletestudent/{id}")
    String deleteStudent(@PathVariable Long id){
        if(!studentRepository.existsById(id)){
            throw new StudentNotFoundException(id);
        }
        studentRepository.deleteById(id);
        return  "Student with id "+id+" has been deleted success.";
    }
	 @GetMapping("/search")
		List<Student> getAllStudents(Model model , @Param("keyword") String keyword) {
			Iterable<Student> student = studentRepository.findAll(keyword);
			model.addAttribute("student",student);
			return studentRepository.findAll(keyword);
			

		}


}