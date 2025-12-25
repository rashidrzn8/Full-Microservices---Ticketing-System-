package com.example.inventoryService.controller;


import com.example.inventoryService.response.EventInventoryResponse;
import com.example.inventoryService.response.VenueInventoryResponse;
import com.example.inventoryService.service.InventoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
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
        return inventoryService.getAllEvents();
    }

}
