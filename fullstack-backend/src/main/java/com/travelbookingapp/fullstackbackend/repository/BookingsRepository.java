package com.travelbookingapp.fullstackbackend.repository;

import com.travelbookingapp.fullstackbackend.model.Bookings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface BookingsRepository extends JpaRepository<Bookings, Long> {

    @Query(value = "select * from bookings where bookings.user_id = :id " +
            "and bookings.end_date >= :today order by bookings.start_date", nativeQuery = true)
    List<Bookings> findByUserId(Long id, Date today);

    @Query(value = "select * from bookings where bookings.user_id = :id " +
            "and bookings.end_date <= :today order by bookings.start_date", nativeQuery = true)
    List<Bookings> findHistoryByUserId(Long id, Date today);

    Bookings findBookingById(Long id);

}

