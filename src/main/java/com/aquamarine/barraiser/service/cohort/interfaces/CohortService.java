package com.aquamarine.barraiser.service.cohort.interfaces;

import com.aquamarine.barraiser.dto.model.CohortDTO;
import com.aquamarine.barraiser.dto.model.UserDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.Set;

public interface CohortService {
    boolean createCohort(CohortDTO cohortdto, MultipartFile multipartFile) throws IOException;
    boolean deleteCohort(int cohort_id);
    boolean editCohort(CohortDTO cohortDTO, MultipartFile multipartFile) throws IOException;
    Map<String, Object> findById(int id) throws IOException;
    boolean addUserToCohort(int cohort_id, String traineeEmail);
    boolean deleteStudentFromCohort(int cohort_id, int user_id);
    boolean addDrinkToCohort(int cohort_id, int drink_id);
    boolean deleteDrinkFromCohort(int cohort_id, int drink_id);
    Set<Map<String, Object>> getDrinksFromCohort(int cohort_id) throws IOException;
    Set<UserDTO> getCohortUsers(int cohort_id);
    Set<Map<String, Object>> getUserCohorts(int user_id) throws IOException;

}