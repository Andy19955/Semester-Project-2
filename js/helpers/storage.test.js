import { expect, describe, it, beforeEach } from "vitest";
import {
  saveToken,
  getToken,
  saveName,
  getName,
  saveApiKey,
  getApiKey,
} from "./storage.js";

describe("getName", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("Should save token to local storage", () => {
    saveToken("test-token");
    expect(localStorage.getItem("token")).toBe("test-token");
  });

  it("Should return the stored token", () => {
    localStorage.setItem("token", "test-token");
    expect(getToken()).toBe("test-token");
  });

  it("Should return null if no token is stored", () => {
    expect(getToken()).toBeNull();
  });

  it("Should store the user name", () => {
    saveName("John");
    expect(localStorage.getItem("name")).toBe("John");
  });

  it("Should return the stored user name", () => {
    localStorage.setItem("name", "John");
    expect(getName()).toBe("John");
  });

  it("Should return null if no user name is stored", () => {
    expect(getName()).toBeNull();
  });

  it("Should save API key to local storage", () => {
    saveApiKey("test-api-key");
    expect(localStorage.getItem("key")).toBe("test-api-key");
  });

  it("Should return the stored API key", () => {
    localStorage.setItem("key", "test-api-key");
    expect(getApiKey()).toBe("test-api-key");
  });
});
