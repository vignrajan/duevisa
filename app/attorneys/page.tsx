import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MapPin, Phone, Star, ExternalLink } from "lucide-react";
import { AttorneyLeadForm } from "./AttorneyLeadForm";

export const metadata: Metadata = {
  title: "Immigration Attorneys",
  description: "Find vetted immigration attorneys by state. DueVisa connects immigrants with trusted legal professionals for visa renewals, green cards, and more.",
};

const ATTORNEYS = [
  {
    name: "Sarah Chen, Esq.",
    firm: "Chen Immigration Law",
    state: "California",
    city: "San Jose",
    specialties: ["H-1B", "EB-2/EB-3", "Green Card", "O-1"],
    rating: 4.9,
    reviews: 142,
    phone: "+1 (408) 555-0101",
    website: "https://example.com",
  },
  {
    name: "Michael Patel, JD",
    firm: "Patel & Associates",
    state: "New York",
    city: "New York City",
    specialties: ["F-1/OPT", "H-1B", "TN Visa", "I-485"],
    rating: 4.8,
    reviews: 98,
    phone: "+1 (212) 555-0102",
    website: "https://example.com",
  },
  {
    name: "Priya Sharma, Esq.",
    firm: "Sharma Immigration",
    state: "Texas",
    city: "Houston",
    specialties: ["H-4 EAD", "Green Card", "L-1", "E-2"],
    rating: 4.7,
    reviews: 76,
    phone: "+1 (713) 555-0103",
    website: "https://example.com",
  },
  {
    name: "David Nguyen, JD",
    firm: "Nguyen Law Group",
    state: "Washington",
    city: "Seattle",
    specialties: ["H-1B", "O-1", "EB-1", "Naturalization"],
    rating: 4.9,
    reviews: 121,
    phone: "+1 (206) 555-0104",
    website: "https://example.com",
  },
  {
    name: "Lisa Park, Esq.",
    firm: "Park Immigration Law",
    state: "Illinois",
    city: "Chicago",
    specialties: ["TN Visa", "L-1", "H-1B", "Green Card"],
    rating: 4.8,
    reviews: 89,
    phone: "+1 (312) 555-0105",
    website: "https://example.com",
  },
  {
    name: "Raj Kumar, JD",
    firm: "Kumar & Partners",
    state: "Massachusetts",
    city: "Boston",
    specialties: ["F-1/STEM OPT", "H-1B Cap", "EB-2 NIW", "I-140"],
    rating: 4.9,
    reviews: 163,
    phone: "+1 (617) 555-0106",
    website: "https://example.com",
  },
];

export default function AttorneysPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-page)" }}>
      <Navbar />

      <main className="pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16 relative">
            <span className="badge badge-good mb-5 relative">Vetted Professionals</span>
            <h1 className="h-section text-primary mb-5">
              Immigration <span className="text-forest">Attorneys</span>
            </h1>
            <p className="text-lg max-w-2xl mx-auto leading-relaxed text-secondary">
              Trusted immigration attorneys by state. Each attorney has been vetted
              for expertise and client satisfaction.
            </p>
          </div>

          {/* Attorney Lead Form */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="card !p-8 bg-page-alt2 border-border-default">
              <h2 className="font-bold text-primary text-xl mb-2 tracking-tight">
                Need immediate help?
              </h2>
              <p className="text-secondary text-sm mb-6 leading-relaxed">
                Describe your situation and we&apos;ll connect you with the right attorney within 24 hours.
              </p>
              <AttorneyLeadForm />
            </div>
          </div>

          {/* Attorney directory */}
          <h2 className="font-bold text-primary text-2xl mb-6 tracking-tight">
            Browse by State
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ATTORNEYS.map((attorney) => (
              <div key={attorney.name} className="bg-card-bg border border-border-default rounded-2xl p-6 hover:shadow-card-hover hover:border-forest transition-all duration-300">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-primary text-base tracking-tight">{attorney.name}</h3>
                    <p className="text-secondary text-sm font-medium">{attorney.firm}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-yellow-50 border border-yellow-200 px-2.5 py-1 rounded-xl flex-shrink-0">
                    <Star size={12} className="text-yellow-600 fill-yellow-600" />
                    <span className="font-bold text-yellow-700 text-xs">{attorney.rating}</span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-1.5 text-secondary text-xs mb-2 font-medium">
                  <MapPin size={14} className="flex-shrink-0" />
                  {attorney.city}, {attorney.state}
                </div>

                {/* Reviews */}
                <p className="text-muted text-xs mb-4 font-semibold tracking-wide">{attorney.reviews} verified reviews</p>

                {/* Specialties */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {attorney.specialties.map((s) => (
                    <span key={s} className="px-2.5 py-1 rounded-lg bg-card-elevated text-secondary border border-border-default text-[11px] font-semibold tracking-wide">
                      {s}
                    </span>
                  ))}
                </div>

                {/* Contact */}
                <div className="flex items-center gap-2 pt-4 border-t border-border-subtle mt-auto">
                  <a
                    href={`tel:${attorney.phone}`}
                    className="flex items-center gap-1.5 text-secondary hover:text-forest dark:hover:text-lime font-medium text-xs transition-colors duration-200 cursor-pointer"
                  >
                    <Phone size={14} />
                    {attorney.phone}
                  </a>
                  <Link
                    href="/attorneys/coming-soon"
                    className="ml-auto flex items-center gap-1 text-forest text-xs hover:text-forest-dark transition-colors duration-200 cursor-pointer font-bold"
                  >
                    Visit site
                    <ExternalLink size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-20">
            <div className="bg-page-alt border border-border-default rounded-2xl max-w-md mx-auto p-8">
              <p className="text-primary font-bold text-lg mb-2 tracking-tight">Are you an immigration attorney?</p>
              <p className="text-secondary text-sm mb-6 leading-relaxed">Join our verified directory and connect with immigrants who need your expertise.</p>
              <Link href="/attorneys/coming-soon" className="btn-primary w-full justify-center">
                Apply to be listed
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
