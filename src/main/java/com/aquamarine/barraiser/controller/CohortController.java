package com.aquamarine.barraiser.controller;


import com.aquamarine.barraiser.ApiController;
import com.aquamarine.barraiser.dto.mapper.CohortDTOMapper;
import com.aquamarine.barraiser.dto.mapper.UserDTOMapper;
import com.aquamarine.barraiser.dto.model.CohortDTO;
import com.aquamarine.barraiser.dto.model.UserDTO;
import com.aquamarine.barraiser.model.Cohort;
import com.aquamarine.barraiser.model.User;
import com.aquamarine.barraiser.security.CurrentUser;
import com.aquamarine.barraiser.security.UserPrincipal;
import com.aquamarine.barraiser.service.cohort.interfaces.CohortService;
import com.aquamarine.barraiser.service.images.interfaces.ImageService;
import com.aquamarine.barraiser.service.user.interfaces.UserService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping(path="/api/cohort")
public class CohortController {

    @Autowired
    private CohortService cohortService;

    @Autowired
    private UserService userService;

    @Autowired
    private ImageService imageService;

    @Value("${app.awsServices.endpoint}")
    private String endpointUrl;

    @Value("${app.awsServices.bucketName}")
    private String bucketName;

    @Value("/cohorts")
    private String folder;

    @RequestMapping(path="/addCohort", method= RequestMethod.POST)
    @PreAuthorize("hasAuthority('BARTENDER')")
    public ResponseEntity addCohort(@RequestPart(value = "file") MultipartFile multipartFile, @RequestPart CohortDTO cohortDTO) throws IOException {
        cohortService.createCohort(cohortDTO, multipartFile);
        return new ResponseEntity(HttpStatus.OK);
    }

    @RequestMapping(path="/uploadCohortPicture", method = RequestMethod.POST)
    public void uploadFile(@RequestPart(value = "file") MultipartFile multipartFile){
        String fileUrl = "";
        String  status = null;

        try {

            //converting multipart file to file
            File file = imageService.convertMultiPartToFile(multipartFile, "test");

            //filename
            String fileName = multipartFile.getOriginalFilename();
            System.out.println(fileName);
            fileUrl = endpointUrl + "/" + bucketName + "/" + fileName;
            System.out.println(fileUrl);

            imageService.uploadFileToS3bucket(fileName, file, "/images/cohorts");

            file.delete();

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

    }


    @RequestMapping(path = "/deleteCohort", method = RequestMethod.DELETE)
    @PreAuthorize("hasAuthority('BARTENDER')")
    public ResponseEntity deleteCohort(@RequestParam CohortDTO cohortDTO){
        cohortService.deleteCohort(cohortDTO);
        return new ResponseEntity(HttpStatus.OK);
    }

    @RequestMapping(path="/addTrainee", method= RequestMethod.POST)
//    @PreAuthorize("hasAuthority('BARTENDER')")
    public ResponseEntity addTraineeToCohort( @RequestParam  int cohort_id,  @RequestParam int user_id) {
        System.out.println(cohort_id);
        System.out.println(user_id);
        cohortService.addUserToCohort(cohort_id, user_id);
        return new ResponseEntity(HttpStatus.OK);
    }

    @RequestMapping(path="/deleteTrainee", method= RequestMethod.POST)
//    @PreAuthorize("hasAuthority('BARTENDER')")
    public ResponseEntity deleteTraineeToCohort( @RequestParam  int cohort_id,  @RequestParam int user_id) {
        cohortService.deleteStudentFromCohort(cohort_id, user_id);
        return new ResponseEntity(HttpStatus.OK);
    }

    @RequestMapping(path="/viewTrainees", method= RequestMethod.GET)
    @PreAuthorize("hasAuthority('BARTENDER')")
    public Set<UserDTO> viewTrainees(@PathVariable int cohort_id) {
        return cohortService.getCohortUsers(cohort_id);
    }

    @RequestMapping(path="/viewCohorts/{user_id}", method= RequestMethod.GET)
//    @PreAuthorize("hasAnyAuthority('BARTENDER', 'TRAINEE')")
    public Set<CohortDTO> viewCohorts(@PathVariable int user_id) {
        return cohortService.getUserCohorts(user_id);
    }

    @RequestMapping(path="/getCohortPicture", method = RequestMethod.GET)
//    @PreAuthorize("hasAnyAuthority('BARTENDER', 'TRAINEE')")
    public ResponseEntity<byte[]> getCohortPicture(int cohort_id) throws IOException {
        System.out.println("HERE");
        return cohortService.getCohortPicture(cohort_id);
    }

    @RequestMapping(path="/getCohort", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> getCohort(@RequestParam int cohort_id) throws IOException {
        return cohortService.findById(cohort_id);
    }
}
