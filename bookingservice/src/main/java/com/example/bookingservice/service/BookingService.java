package com.example.bookingservice.service;

import com.example.bookingservice.entity.Customer;
import com.example.bookingservice.repository.CustomerRepository;
import com.example.bookingservice.request.BookingRequest;
import com.example.bookingservice.response.BookingResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookingService {

    private final CustomerRepository customerRepository;
    @Autowired
    public BookingService(CustomerRepository customerRepository){
        this.customerRepository = customerRepository;
    }

    public BookingResponse createBooking(BookingRequest bookingRequest){
        //check wherther the customer is available
        final Customer customer = customerRepository.findById(bookingRequest.getUserId()).orElse(null);

    }
}
