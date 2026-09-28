package com.email_writer.email_write_spring_boot.controller;


import com.email_writer.email_write_spring_boot.dto.EmailRequest;
import com.email_writer.email_write_spring_boot.service.EmailGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@CrossOrigin(origins = "*")
public class EmailGenerator
{

    @Autowired
    EmailGeneratorService emailGeneratorService;

    @PostMapping("/generate")
    public ResponseEntity<String> generateEmail(@RequestBody EmailRequest emailRequest)
    {
        try{

            String response = emailGeneratorService.generateEmailReply(emailRequest);
            return ResponseEntity.ok(response);
        }
        catch (Exception e)
        {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("Failed to generate response");
        }

    }
}
