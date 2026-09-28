package com.email_writer.email_write_spring_boot.dto;


import lombok.*;

@Getter
@Setter
@Data
public class EmailRequest
{
    private String emailContent;
    private String tone;

    public EmailRequest() {
    }

    public EmailRequest(String emailContent, String tone) {
        this.emailContent = emailContent;
        this.tone = tone;
    }

    public String getEmailContent() {
        return emailContent;
    }

    public void setEmailContent(String emailContent) {
        this.emailContent = emailContent;
    }

    public String getTone() {
        return tone;
    }

    public void setTone(String tone) {
        this.tone = tone;
    }
}
