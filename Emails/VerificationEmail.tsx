import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
} from "@react-email/components";

interface VerificationEmailProps {
  username: string;
  otp: string;
}
export default function VerificationEmail({
  username,
  otp,
}: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title> Verification Code </title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KF0mCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Here&apos;s Your Verification Code: {otp}</Preview>
      <Section>
        <Row>
          <Heading as="h2">Hellow {username},</Heading>
        </Row>
        <Row>
          <Text>
            Thank You For Registrating, Please Use The Following Verification
            Code To Complete Your Registration;
          </Text>
        </Row>
        <Row>
          <Text>{otp}</Text>
        </Row>
        <Row>
          <Text>
            If You Didn't Request This Code, Please Ignore This Email.
          </Text>
        </Row>
      </Section>
    </Html>
  );
}
