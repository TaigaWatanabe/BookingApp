package com.travelbookingapp.fullstackbackend.controller;

import com.travelbookingapp.fullstackbackend.exception.UserNotFoundException;
import com.travelbookingapp.fullstackbackend.model.Bookings;
import com.travelbookingapp.fullstackbackend.model.User;
import com.travelbookingapp.fullstackbackend.repository.BookingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.*;

@RestController
@CrossOrigin("http://localhost:3000")
public class BookingController {

    @Autowired
    BookingsRepository bookingsRepository;

    @PostMapping("/booking/{startDate}/{endDate}/{userId}")
    Map<String, String> bookingFunction(@RequestBody Bookings booking,
                                        @PathVariable Date startDate,
                                        @PathVariable Date endDate,
                                        @PathVariable Long userId) {

        Map<String, String> Something = new HashMap<>();

        if (endDate.before(startDate) || endDate.compareTo(startDate) == 0) {
            Something.put("errorMessage",
                    "Inputted endDate should make after startDate");
            Something.put("status", "error");
            return Something;
        }

        booking.setStart_date(startDate);
        booking.setEnd_date(endDate);
        booking.setUser_id(userId);
        bookingsRepository.save(booking);
        return Something;
    }

    @GetMapping("/bookings/{id}")
    List<Bookings> getBookingsByuserId(@PathVariable Long id) {
        Date today = new Date();
        List<Bookings> bookings = bookingsRepository.findByUserId(id, today);
        int numberOfList = bookings.size();
        for (int i = 0; i < numberOfList; i++) {
            Bookings booking = bookings.get(i);
            Date checkInDay = booking.getStart_date();
            Date checkOutDay = booking.getEnd_date();
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(checkInDay);
            calendar.add(Calendar.DAY_OF_MONTH, 1);
            checkInDay = calendar.getTime();
            calendar.setTime(checkOutDay);
            calendar.add(Calendar.DAY_OF_MONTH, 1);
            checkOutDay = calendar.getTime();
            booking.setStart_date(checkInDay);
            booking.setEnd_date(checkOutDay);
        }
        return bookings;
    }

    @GetMapping("/bookings/history/{id}")
    List<Bookings> getBookingshistoryByuserId(@PathVariable Long id) {
        Date today = new Date();
        List<Bookings> bookings = bookingsRepository.findHistoryByUserId(id, today);
        int numberOfList = bookings.size();
        for (int i = 0; i < numberOfList; i++) {
            Bookings booking = bookings.get(i);
            Date checkInDay = booking.getStart_date();
            Date checkOutDay = booking.getEnd_date();
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(checkInDay);
            calendar.add(Calendar.DAY_OF_MONTH, 1);
            checkInDay = calendar.getTime();
            calendar.setTime(checkOutDay);
            calendar.add(Calendar.DAY_OF_MONTH, 1);
            checkOutDay = calendar.getTime();
            booking.setStart_date(checkInDay);
            booking.setEnd_date(checkOutDay);
        }
        return bookings;
    }

    @DeleteMapping("/booking/delete/{id}")
    void deleteBooking(@PathVariable Long id) {
        bookingsRepository.deleteById(id);
    }

    @GetMapping("/booking/edit/{id}")
    Bookings getBookingById(@PathVariable Long id) {
        Date today = new Date();
        Bookings booking = bookingsRepository.findBookingById(id);
        Date checkInDay = booking.getStart_date();
        Date checkOutDay = booking.getEnd_date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(checkInDay);
        calendar.add(Calendar.DAY_OF_MONTH, 1);

        checkInDay = calendar.getTime();
        calendar.setTime(checkOutDay);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        checkOutDay = calendar.getTime();
        booking.setStart_date(checkInDay);
        booking.setEnd_date(checkOutDay);
        return booking;
    }

    @PutMapping("/booking/update/{startDate}/{endDate}/{id}")
    Map<String, String> updateBooking(@RequestBody Bookings updatebooking,
                                      @PathVariable Date startDate,
                                      @PathVariable Date endDate,
                                      @PathVariable Long id) {
        Map<String, String> Something = new HashMap<>();

        if (endDate.before(startDate) || endDate.compareTo(startDate) == 0) {
            Something.put("errorMessage",
                    "Inputted endDate should make after startDate");
            Something.put("status", "error");
            return Something;
        }

        Bookings editBooking = bookingsRepository.findBookingById(id);
        editBooking.setStart_date(startDate);
        editBooking.setEnd_date(endDate);
        editBooking.setMemo(updatebooking.getMemo());
        bookingsRepository.save(editBooking);

        return Something;

    }

}
