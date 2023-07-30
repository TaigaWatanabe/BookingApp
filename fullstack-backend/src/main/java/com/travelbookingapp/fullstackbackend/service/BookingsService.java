package com.travelbookingapp.fullstackbackend.service;

import com.travelbookingapp.fullstackbackend.repository.BookingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookingsService {

    @Autowired
    BookingsRepository bookingsRepository;

}
