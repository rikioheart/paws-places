import { describe, it, expect } from "vitest";
import { PARTNERS, ACTIVITY_REQUIREMENTS } from "@/lib/data";

describe("Published partner information", () => {
  it("uses the Flair’Rita code published by the association", () => {
    expect(PARTNERS.find(p => p.name === "Flair’Rita")?.code).toBe("ALVC");
    expect(PARTNERS.find(p => p.name === "Flair’Rita")?.perk).toBe("5 % de réduction");
  });
  it("uses Patte Saine’s published code without inventing a discount", () => {
    const partner = PARTNERS.find(p => p.name === "Patte Saine");
    expect(partner?.code).toBe("MOA");
    expect(partner?.perk).toBe("Code partenaire");
  });
  it("does not expose an unpublished Cynopod code", () => {
    expect(PARTNERS.find(p => p.name === "Cynopod")?.code).toBeUndefined();
  });
  it("does not require a behavioral assessment before every activity", () => {
    expect(ACTIVITY_REQUIREMENTS.behavioralAssessmentRequired).toBe(false);
  });
  it("reuses a partner assessment across activities", () => {
    expect(ACTIVITY_REQUIREMENTS.partnerAssessmentReusable).toBe(true);
  });
});
