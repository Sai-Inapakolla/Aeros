package buildingblocks.testbase;

import jakarta.annotation.PostConstruct;
import org.junit.jupiter.api.AfterEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;


@SpringBootTest
@AutoConfigureMockMvc
@WithMockUser(authorities = "ADMIN")
public abstract class TestBase {

    @Autowired
    private ApplicationContext applicationContext;

    @Autowired
    protected MockMvc mockMvc;

    protected TestFixture fixture;

    @PostConstruct
    public void setupFixture() {
        this.fixture = new TestFixture(applicationContext);
    }

    @AfterEach
    public void cleanDatabase() {
        fixture.cleanupJpa();
        fixture.cleanupMongo();
        fixture.cleanupRabbitmq();
    }
}