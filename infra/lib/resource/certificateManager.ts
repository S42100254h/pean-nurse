import * as cdk from "@aws-cdk/core";
import { CfnCertificate } from "@aws-cdk/aws-certificatemanager";
import { Resource } from "./abstract/resource";

export class CertificateManager extends Resource {
  public certificate: CfnCertificate;

  constructor() {
    super();
  }

  createResources(scope: cdk.Construct) {
    this.certificate = new CfnCertificate(scope, "Certificate", {
      domainName: "pean-nurse.com",
      subjectAlternativeNames: ["*.pean-nurse.com"],
      validationMethod: "DNS",
    });
  }
}
