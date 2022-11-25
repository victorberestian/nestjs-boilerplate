import { NestFactory } from '@nestjs/core';
import { HttpAppModule } from './module/HttpAppModule';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(HttpAppModule);

  app.use(
          helmet.contentSecurityPolicy({
            directives: {
              "script-src": ["'self'", "example.com"],
              "style-src": null,
            },
          })
  );

  app.use(helmet.crossOriginEmbedderPolicy({ policy: "credentialless" }));
  // Sets "Cross-Origin-Opener-Policy: same-origin-allow-popups"
  app.use(
          helmet({ crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" } })
  );
  // Sets "unsafe-none-Opener-Policy: unsafe-none"
  app.use(helmet.crossOriginOpenerPolicy({ policy: "unsafe-none" }));


// Sets "X-DNS-Prefetch-Control: on"
  app.use(
          helmet.dnsPrefetchControl({
            allow: true,
          })
  );

  // Sets "Expect-CT: max-age=86400, enforce, report-uri="https://example.com/report"
  app.use(
          helmet.expectCt({
            maxAge: 86400,
            enforce: true,
            reportUri: "https://example.com/report",
          })
  );


// Sets "X-Frame-Options: SAMEORIGIN"
  app.use(
          helmet.frameguard({
            action: "sameorigin",
          })
  );

  app.use(helmet.hidePoweredBy());
  // Sets "Strict-Transport-Security: max-age=123456; includeSubDomains; preload"
  app.use(
          helmet.hsts({
            maxAge: 63072000,
            preload: true,
          })
  );
  app.use(helmet.ieNoOpen());
  app.use(helmet.noSniff());
  // Sets "Origin-Agent-Cluster: ?1"
  app.use(helmet.originAgentCluster());

// Sets "X-Permitted-Cross-Domain-Policies: by-content-type"
  app.use(
          helmet.permittedCrossDomainPolicies({
            permittedPolicies: "by-content-type",
          })
  );

  // Sets "Referrer-Policy: no-referrer"
  app.use(
          helmet.referrerPolicy({
            policy: "no-referrer",
          })
  );
  app.use(helmet.xssFilter());

  await app.listen(3000);
}
bootstrap();
