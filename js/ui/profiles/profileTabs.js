import { fetchProfileBids } from "../../api/profiles/fetchProfileBids.js";
import { fetchProfileWins } from "../../api/profiles/fetchProfileWins.js";
import { displayListings } from "../listings/displayListings.js";
import { displayMessage } from "../shared/displayMessage.js";
import { getName } from "../../helpers/storage.js";

/**
 * Manages tab functionality for the profile page auction activity section.
 * Handles switching between My auctions, Active bids, and Won auctions tabs.
 * @param {Object} profileData - The profile data containing counts
 */
export function setupProfileTabs(profileData = null) {
  const tabs = document.querySelectorAll(".tab-btn");
  const panels = document.querySelectorAll(".tab-panel");

  /**
   * Updates all tab counters on page load
   */
  async function updateAllCounters() {
    const name = getName();

    try {
      if (profileData && profileData._count && profileData._count.listings) {
        document.querySelector("#my-auctions-count").textContent =
          profileData._count.listings.toString();
      } else {
        document.querySelector("#my-auctions-count").textContent = "0";
      }

      const bids = await fetchProfileBids(name, 1);
      if (bids.data) {
        const currentTime = new Date();
        const activeBidsCount = bids.data.filter(
          (bid) =>
            bid.listing &&
            bid.listing.id &&
            new Date(bid.listing.endsAt) > currentTime,
        ).length;
        document.querySelector("#active-bids-count").textContent =
          activeBidsCount.toString();
      } else {
        document.querySelector("#active-bids-count").textContent = "0";
      }

      if (profileData && profileData._count && profileData._count.wins) {
        document.querySelector("#won-auctions-count").textContent =
          profileData._count.wins.toString();
      } else {
        const wins = await fetchProfileWins(name, 1);
        const wonAuctionsCount = wins.data
          ? wins.data.filter((win) => win.listing && win.listing.id).length
          : 0;
        document.querySelector("#won-auctions-count").textContent =
          wonAuctionsCount.toString();
      }
    } catch (error) {
      console.error("Error updating tab counters:", error);
      document.querySelector("#my-auctions-count").textContent = "0";
      document.querySelector("#active-bids-count").textContent = "0";
      document.querySelector("#won-auctions-count").textContent = "0";
    }
  }

  /**
   * Activates the specified tab and shows its corresponding panel.
   * @param {string} tabId - The ID of the tab to activate
   */
  function activateTab(tabId) {
    tabs.forEach((tab) => {
      tab.classList.remove("border-blue-500", "text-blue-600");
      tab.classList.add("border-transparent", "text-gray-500");
      tab.setAttribute("aria-selected", "false");
    });

    panels.forEach((panel) => {
      panel.classList.add("hidden");
    });

    const activeTab = document.querySelector(`#${tabId}`);
    if (activeTab) {
      activeTab.classList.remove("border-transparent", "text-gray-500");
      activeTab.classList.add("border-blue-500", "text-blue-600");
      activeTab.setAttribute("aria-selected", "true");
    }

    const panelId = activeTab.getAttribute("aria-controls");
    const activePanel = document.querySelector(`#${panelId}`);
    if (activePanel) {
      activePanel.classList.remove("hidden");
    }

    switch (tabId) {
      case "my-auctions-tab":
        break;
      case "active-bids-tab":
        loadActiveBids();
        break;
      case "won-auctions-tab":
        loadWonAuctions();
        break;
    }
  }

  /**
   * Loads and displays user's active bids.
   */
  async function loadActiveBids() {
    const loader = document.querySelector("#active-bids-loader");
    const container = document.querySelector("#active-bids-container");
    const noDataMessage = document.querySelector("#no-active-bids");
    const name = getName();

    loader.classList.remove("hidden");
    container.innerHTML = "";
    noDataMessage.classList.add("hidden");

    try {
      const bids = await fetchProfileBids(name, 1);
      loader.classList.add("hidden");

      if (bids.data && bids.data.length > 0) {
        const currentTime = new Date();
        const activeBids = bids.data.filter((bid) => {
          return bid.listing && new Date(bid.listing.endsAt) > currentTime;
        });
        if (activeBids.length > 0) {
          displayListings(
            activeBids.map((bid) => bid.listing),
            container,
          );
          document.querySelector("#active-bids-count").textContent =
            activeBids.length.toString();
        } else {
          noDataMessage.classList.remove("hidden");
          document.querySelector("#active-bids-count").textContent = "0";
        }
      } else {
        noDataMessage.classList.remove("hidden");
        document.querySelector("#active-bids-count").textContent = "0";
      }
    } catch (error) {
      loader.classList.add("hidden");
      noDataMessage.classList.remove("hidden");
      document.querySelector("#active-bids-count").textContent = "0";
      displayMessage("#messageContainer", "error", error.message);
    }
  }

  /**
   * Loads and displays user's won auctions.
   */
  async function loadWonAuctions() {
    const loader = document.querySelector("#won-auctions-loader");
    const container = document.querySelector("#won-auctions-container");
    const noDataMessage = document.querySelector("#no-won-auctions");
    const name = getName();

    loader.classList.remove("hidden");
    container.innerHTML = "";
    noDataMessage.classList.add("hidden");

    try {
      const wins = await fetchProfileWins(name, 1);
      loader.classList.add("hidden");

      if (wins.data && wins.data.length > 0) {
        displayListings(wins.data, container);
        document.querySelector("#won-auctions-count").textContent =
          wins.data.length.toString();
      } else {
        noDataMessage.classList.remove("hidden");
        document.querySelector("#won-auctions-count").textContent = "0";
      }
    } catch (error) {
      loader.classList.add("hidden");
      noDataMessage.classList.remove("hidden");
      document.querySelector("#won-auctions-count").textContent = "0";
      displayMessage("#messageContainer", "error", error.message);
    }
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      activateTab(tab.id);
    });
  });

  activateTab("my-auctions-tab");

  updateAllCounters();
}
