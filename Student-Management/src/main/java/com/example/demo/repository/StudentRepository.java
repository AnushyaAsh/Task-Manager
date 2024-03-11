package com.example.demo.repository;

import com.example.demo.model.Student; 

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface StudentRepository extends JpaRepository<Student,Long> {
	@Query("SELECT s FROM Student s WHERE s.name LIKE ?1%")
	public List<Student> findAll(String keyword);
}