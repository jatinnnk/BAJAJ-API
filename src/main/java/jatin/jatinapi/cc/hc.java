package jatin.jatinapi.cc;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
public class hc {

    @GetMapping("/health")
    public Map<String, Object> health() {
        return Map.of(
                "is_success", true,
                "official_email", "jatin1256.be23@chitkarauniversity.edu.in"
        );
    }
}
