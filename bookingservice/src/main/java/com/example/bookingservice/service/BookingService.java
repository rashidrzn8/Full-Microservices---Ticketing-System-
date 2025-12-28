package com.example.bookingservice.service;

import com.example.bookingservice.client.InventoryServiceClient;
import com.example.bookingservice.entity.Customer;
import com.example.bookingservice.repository.CustomerRepository;
import com.example.bookingservice.request.BookingRequest;
import com.example.bookingservice.response.BookingResponse;
import com.example.bookingservice.response.InventoryResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookingService {

    private final CustomerRepository customerRepository;
    private final InventoryServiceClient inventoryServiceClient;
    @Autowired
    public BookingService(CustomerRepository customerRepository,InventoryServiceClient inventoryServiceClient){
        this.customerRepository = customerRepository;
        this.inventoryServiceClient=inventoryServiceClient;
    }

    public BookingResponse createBooking(BookingRequest bookingRequest){
        //check wherther the customer is available
        final Customer customer = customerRepository.findById(bookingRequest.getUserId()).orElse(null);
        if (customer == null){
            throw  new RuntimeException();
        }

        final InventoryResponse inventoryResponse = inventoryServiceClient.getInventory(bookingRequest.getEventId());
        System.out.println("Inventory Service Response"+ inventoryResponse);

        if (inventoryResponse.getCapacity() < bookingRequest.getTicketCount()){
            throw new RuntimeException("Not enough inventory");
        }
        return  BookingResponse.builder().build();
    }
}
