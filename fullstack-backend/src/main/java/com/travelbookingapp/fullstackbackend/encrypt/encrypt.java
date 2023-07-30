package com.travelbookingapp.fullstackbackend.encrypt;

import org.apache.tomcat.util.codec.binary.Base64;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class encrypt {

    public static String encrypt(String target) {

        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            md.update(target.getBytes());
            return Base64.encodeBase64URLSafeString(md.digest());
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }
}
