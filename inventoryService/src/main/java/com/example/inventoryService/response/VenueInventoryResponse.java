package com.example.inventoryService.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VenueInventoryResponse {
    private Long id;
    private String venueName;
    private Long totalCapacity;

}
