package com.travelbookingapp.fullstackbackend.repository;

import com.travelbookingapp.fullstackbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    List<User>findByEmail(String email);

    @Query(value="select * from user where user.email = :email and user.password = :password", nativeQuery = true)
    List<User> findByAccount(String email, String password);
}

//    select t from user t where t.email = :email and t.password = :password