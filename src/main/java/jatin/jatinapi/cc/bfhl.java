package jatin.jatinapi.cc;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
public class bfhl {

    @PostMapping("/bfhl")
    public Map<String, Object> handleRequest(@RequestBody Map<String, Object> body) {

        Object result;

        if (body.containsKey("fibonacci")) {

            int n = ((Number) body.get("fibonacci")).intValue();
            result = generateFibSeries(n);

        } else if (body.containsKey("prime")) {

            List<Integer> input = (List<Integer>) body.get("prime");
            result = filterPrimes(input);

        } else if (body.containsKey("lcm")) {

            List<Integer> input = (List<Integer>) body.get("lcm");
            result = calculateLCM(input);
} else if (body.containsKey("hcf")) {

    List<Integer> input = (List<Integer>) body.get("hcf");
    result = calculateHCF(input);

}else if (body.containsKey("AI")) {

    String question = body.get("AI").toString();
    result = askAI(question);

}



        
        else {

            return Map.of(
                    "is_success", false,
                    "official_email", "jatin1256.be23@chitkarauniversity.edu.in",
                    "data", "Invalid key"
            );
        }

        return Map.of(
                "is_success", true,
                "official_email", "jatin1256.be23@chitkarauniversity.edu.in",
                "data", result
        );
    }


    private List<Integer> generateFibSeries(int n) {

        List<Integer> series = new ArrayList<>();

        for (int i = 0; i < n; i++) {
            series.add(fib(i));
        }

        return series;
    }

    private int fib(int n) {

        if (n == 0) return 0;
        if (n == 1) return 1;

        return fib(n - 1) + fib(n - 2);
    }


    private List<Integer> filterPrimes(List<Integer> list) {

        List<Integer> primes = new ArrayList<>();

        for (int num : list) {
            if (isPrime(num)) {
                primes.add(num);
            }
        }

        return primes;
    }

    private boolean isPrime(int n) {

        if (n < 2) return false;

        for (int i = 2; i < n; i++) {
            if (n % i == 0) return false;
        }

        return true;
    }

    private int calculateLCM(List<Integer> list) {

    int lcm = list.get(0);

    for (int i = 1; i < list.size(); i++) {
        lcm = lcm(lcm, list.get(i));
    }

    return lcm;
}

private int lcm(int a, int b) {
    return (a * b) / gcd(a, b);
}


private int calculateHCF(List<Integer> list) {

    int hcf = list.get(0);

    for (int i = 1; i < list.size(); i++) {
        hcf = gcd(hcf, list.get(i));
    }

    return hcf;
}


private int gcd(int a, int b) {

    while (b != 0) {
        int temp = b;
        b = a % b;
        a = temp;
    }

    return a;
}

// ---------- AI ----------

private String askAI(String question) {

    try {

        String apiKey = "AIzaSyABl-G3RlvkcdGwjcBmnKJ7dY6cAydBqXk";

        String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey;

        org.springframework.web.reactive.function.client.WebClient client =
                org.springframework.web.reactive.function.client.WebClient.create();

        Map<String, Object> body = Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(
                                Map.of("text", question+ "Answer in one word only")
                        ))
                )
        );

        Map response = client.post()
                .uri(url)
                .bodyValue(body)
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        List candidates = (List) response.get("candidates");
        Map first = (Map) candidates.get(0);
        Map content = (Map) first.get("content");
        List parts = (List) content.get("parts");
        Map textPart = (Map) parts.get(0);

        return textPart.get("text").toString();

    } catch (Exception e) {

        return "AI error";

    }
}



}


