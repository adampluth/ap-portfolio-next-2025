"use client";
import React from "react";
import Gallery, { GalleryItem } from "@/components/Gallery";

type GalleryPage = {
  projNumber: number;
  projTitle: string;
  projType: string;
  projRole: string;
  projSkills: string;
  projItems: GalleryItem[];
};

const galleryPages: GalleryPage[] = [
  {
    projNumber: 1,
    projTitle: "Richmond American Homes",
    projType: "Company Website",
    projRole:
      "Shared responsibilities with team and IT Department for redesign, styling, and coding of the company website. Analyzed Hotjar User Experience data for layout improvements.",
    projSkills:
      "User research, wireframing, prototyping, design finalization, interactive prototype user testing, A/B testing, final product user testing; Coding in HTML, Sass, jQuery, Bootstrap, and C# in Visual Studio.",
    projItems: [
      {
        pathThumb: "/img/rah-web/RAH_WebsiteRefresh_01_Home_t.jpg",
        pathLarge: "/img/rah-web/RAH_WebsiteRefresh_01_Home.jpg",
        alt: "Richmond American Homes Website",
      },
      {
        pathThumb: "/img/rah-web/RAH_WebsiteRefresh_03_CommLanding_t.jpg",
        pathLarge: "/img/rah-web/RAH_WebsiteRefresh_03_CommLanding.jpg",
        alt: "Richmond American Homes Website",
      },
      {
        pathThumb: "/img/rah-web/RAH_WebsiteRefresh_05_DesignAHome_t.jpg",
        pathLarge: "/img/rah-web/RAH_WebsiteRefresh_05_DesignAHome.jpg",
        alt: "Richmond American Homes Website",
      },
      {
        pathThumb: "/img/rah-web/RAH_WebsiteRefresh_07_CareerCenter_t.jpg",
        pathLarge: "/img/rah-web/RAH_WebsiteRefresh_07_CareerCenter.jpg",
        alt: "Richmond American Homes Website",
      },
    ],
  },
  {
    projNumber: 2,
    projTitle: "Richmond American Homes",
    projType: "Touchscreen Kiosk",
    projRole:
      "Shared responsibilities with team and IT Department for redesign, styling, and coding of the company website. Analyzed Hotjar User Experience data for layout improvements.",
    projSkills:
      "User research, wireframing, prototyping, design finalization, interactive prototype user testing, A/B testing, final product user testing; Coding in HTML, Sass, jQuery, Bootstrap, and C# in Visual Studio.",
    projItems: [
      {
        pathThumb: "/img/rah-ts/RAH_TS3_00_MainDash_t.jpg",
        pathLarge: "/img/rah-ts/RAH_TS3_00_MainDash.jpg",
        alt: "Richmond American Homes Touchscreen",
      },
      {
        pathThumb: "/img/rah-ts/RAH_TS3_05_PlansLandingPage_Calculator_t.jpg",
        pathLarge: "/img/rah-ts/RAH_TS3_05_PlansLandingPage_Calculator.jpg",
        alt: "Richmond American Homes Touchscreen",
      },
      {
        pathThumb: "/img/rah-ts/RAH_TS3_05_PlansLandingPage_Galleries_t.jpg",
        pathLarge: "/img/rah-ts/RAH_TS3_05_PlansLandingPage_Galleries.jpg",
        alt: "Richmond American Homes Touchscreen",
      },
      {
        pathThumb: "/img/rah-ts/RAH_TS3_05_PlansLandingPage_IFP_t.jpg",
        pathLarge: "/img/rah-ts/RAH_TS3_05_PlansLandingPage_IFP.jpg",
        alt: "Richmond American Homes Touchscreen",
      },
    ],
  },
  {
    projNumber: 3,
    projTitle: "Aux Sable Creek Farms",
    projType: "Company Website",
    projRole:
      "Hired as a freelancer to do photography, website, signage, and logo. I visited the company site, went to high tunnel system installs, and met up at farmers markets.",
    projSkills:
      "User research, wireframing, prototyping, design finalization, interactive prototype user testing; Coding in HTML, Sass, jQuery.",
    projItems: [
      {
        pathThumb: "/img/auxsable/AuxSable_01_Main_t.jpg",
        pathLarge: "/img/auxsable/AuxSable_01_Main.jpg",
        alt: "Aux Sable Creek Farms Website",
      },
      {
        pathThumb: "/img/auxsable/AuxSable_02_Technology_t.jpg",
        pathLarge: "/img/auxsable/AuxSable_02_Technology.jpg",
        alt: "Aux Sable Creek Farms Website",
      },
      {
        pathThumb: "/img/auxsable/AuxSable_03_Services_t.jpg",
        pathLarge: "/img/auxsable/AuxSable_03_Services.jpg",
        alt: "Aux Sable Creek Farms Website",
      },
      {
        pathThumb: "/img/auxsable/AuxSable_05_Contact_t.jpg",
        pathLarge: "/img/auxsable/AuxSable_05_Contact.jpg",
        alt: "Aux Sable Creek Farms Website",
      },
    ],
  },
];

export default function UIUXPage() {
  return (
    // Outer container with fixed viewport height and scroll-snap enabled
    <div className="h-screen snap-y snap-mandatory overflow-y-scroll">
      {galleryPages.map((gallery, index) => (
        <Gallery key={index} {...gallery} />
      ))}
    </div>
  );
}
