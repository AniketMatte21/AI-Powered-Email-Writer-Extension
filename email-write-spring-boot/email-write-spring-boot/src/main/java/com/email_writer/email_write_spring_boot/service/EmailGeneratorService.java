package com.email_writer.email_write_spring_boot.service;

import com.email_writer.email_write_spring_boot.dto.EmailRequest;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.rmi.server.ObjID;
import java.util.HashMap;
import java.util.Map;


@Service
public class EmailGeneratorService
{

    @Value("${GEMINI_API_URI}")
    private  String geminiUri;

    @Value("${GEMINI_API_KEY}")
    private  String geminiKey;




    private final WebClient webClient;

    public EmailGeneratorService(WebClient.Builder webClientBuilder)
    {
        this.webClient=webClientBuilder.build();
    }


    public String generateEmailReply(EmailRequest emailRequest) throws JsonProcessingException {
        //generating a string email request
        String prompt=BuildPrompt(emailRequest);

        // building a requestBody
        //        {
        //                    "contents": [
        //                    {
        //                        "parts": [
        //                        {
        //                            "text": "Explain how AI works in a few words"
        //                        }
        //                ]
        //                    }
        //            ]
        //        }
        System.out.println(geminiKey);
        Map<String,Object> requestBody=Map.of(
                "contents",new Object[]{
                        Map.of("parts",new Object[]{
                                Map.of("text",prompt)
                        })
                }
        );

        //do the request and get the response
        String response=webClient.post()
                .uri(geminiUri)
                .header("Content-Type","application/json")
                .header("x-goog-api-key", geminiKey)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        //Extract response
        return extractResponse(response);

    }

    public String extractResponse(String response) throws JsonProcessingException {
        //objectMapper= use for converting json to java obj and java to json obj
        ObjectMapper objectMapper=new ObjectMapper();

        //represent the json tree structure
        //for getting the exact text, read the read first (readTree)
        // get a particular node(JsonNode) from the tree that is text Node
        JsonNode addNodes=objectMapper.readTree(response);
        return addNodes.path("candidates").
                get(0)
                .path("content")
                .path("parts")
                .get(0)
                .path("text")
                .asText();
    }

    public String BuildPrompt(EmailRequest emailRequest)
    {
        StringBuilder stringBuilder=new StringBuilder();
        stringBuilder.append("Generate a professional email reply for the following content. Please dont't generate a subject line ");
        if(emailRequest.getEmailContent()!=null && !emailRequest.getTone().isEmpty())
        {
            stringBuilder.append("use a ").append(emailRequest.getTone()).append("tone");
        }
        stringBuilder.append("\nOriginal email: \n").append(emailRequest.getEmailContent());

        return stringBuilder.toString();
    }
}
