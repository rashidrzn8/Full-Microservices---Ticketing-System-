package com.example.inventoryService.repository;

import com.example.inventoryService.entity.Venue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VenueRepository extends JpaRepository<Venue,Long> {

}
