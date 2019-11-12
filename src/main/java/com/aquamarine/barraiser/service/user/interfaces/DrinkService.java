package com.aquamarine.barraiser.service.user.interfaces;

import com.aquamarine.barraiser.controller.DrinkController;
import com.aquamarine.barraiser.dto.model.DrinkDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface DrinkService {

    void addDrink(DrinkDTO drinkDTO);

    boolean deleteDrink(int id);

    Iterable<DrinkDTO> viewAllDrinks();

    Iterable<DrinkDTO> viewDrinksByUser(int id);
}
