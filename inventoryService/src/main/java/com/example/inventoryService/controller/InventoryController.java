package com.example.inventoryService.controller;


import com.example.inventoryService.response.EventInventoryResponse;
import com.example.inventoryService.response.VenueInventoryResponse;
import com.example.inventoryService.service.InventoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class InventoryController {

    private InventoryService inventoryService;

    public InventoryController(final InventoryService inventoryService){
        this.inventoryService = inventoryService;
    }

    @GetMapping("/inventory/events")
    public @ResponseBody List<EventInventoryResponse> inventoryGetAllEvents(){
        return inventoryService.getAllEvents();
    }

    @GetMapping("/inventory/venue/{venueId}")
    public @ResponseBody VenueInventoryResponse inventoryByVenueId(@PathVariable("venueId") Long venueId){
            return inventoryService.getVenueInformation(venueId);
    }

    @GetMapping("/inventory/events/{eventId}")
    public @ResponseBody EventInventoryResponse inventoryForEvents(@PathVariable("eventId") Long eventId){
        return inventoryService.getEvent(eventId);
    }

    @PutMapping("/inventory/events/{eventId}/capacity/{capacity}")
    public ResponseEntity<Void> updateInventory(@PathVariable("eventId") Long eventId,@PathVariable("capacity") Long ticketBooked){
        inventoryService.updateCapacity(eventId,ticketBooked);
        return ResponseEntity.ok().build();
    }

}
