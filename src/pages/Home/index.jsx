import { useState, useEffect } from "react";
import { getPets } from "../../api/pets";
import { getStats } from "../../api/dashboard";
import { getAppointments } from "../../api/appointments";
import { useAuth } from "../../context/AuthContext";
import GreetingHeader from "./GreetingHeader";
import PetSwitcher from "./PetSwitcher";
import QuickActions from "./QuickActions";
import UpcomingAppt from "./UpcomingAppt";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

export default function Home() {
  const { user } = useAuth();
  const [pets, setPets] = useState([]);
  const [activePetId, setActivePetId] = useState(null);
  const [stats, setStats] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [petsRes, statsRes, apptRes] = await Promise.allSettled([
          getPets(),
          getStats(),
          getAppointments(),
        ]);

        const petsList =
          petsRes.status === "fulfilled" ? petsRes.value.data : [];
        setPets(Array.isArray(petsList) ? petsList : petsList.results || []);
        if (petsList.length > 0) setActivePetId(petsList[0]?.id);

        if (statsRes.status === "fulfilled") setStats(statsRes.value.data);

        const apptList =
          apptRes.status === "fulfilled" ? apptRes.value.data : [];
        setAppointments(
          Array.isArray(apptList) ? apptList : apptList.results || [],
        );
      } catch {
        // fail silently — data just won't render
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <LoadingSpinner text="Loading your dashboard…" />;

  const userName = user?.username || user?.first_name || "Pet Parent";

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <GreetingHeader userName={userName} />
      <PetSwitcher
        pets={pets}
        activePetId={activePetId}
        setActivePetId={setActivePetId}
      />

      <div className="px-5 space-y-6 pb-10 flex-grow">
        {/* Stats cards */}
        {stats && (
          <section className="grid grid-cols-2 gap-3">
            <StatCard
              label="My Pets"
              value={stats.pets_count ?? pets.length}
              emoji="🐾"
            />
            <StatCard
              label="Upcoming"
              value={stats.appointments_upcoming ?? 0}
              emoji="📅"
            />
            <StatCard
              label="Vaccines Due"
              value={stats.vaccinations_due ?? 0}
              emoji="💉"
            />
            <StatCard
              label="Unread"
              value={stats.unread_notifications ?? 0}
              emoji="🔔"
            />
          </section>
        )}

        {/* Quick actions */}
        <section>
          <h2 className="font-display text-base font-bold text-gray-800 mb-3">
            Quick Actions
          </h2>
          <QuickActions />
        </section>

        {/* Next appointment */}
        {appointments.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display text-base font-bold text-gray-800">
                Next Appointment
              </h2>
            </div>
            <UpcomingAppt appointment={appointments[0]} />
          </section>
        )}
      </div>

      {/* Team & project footer */}
      <footer className="mt-auto px-5 py-6 text-center border-t border-gray-200 bg-white/70 backdrop-blur-sm">
        <div className="text-xs text-gray-500 leading-relaxed max-w-md mx-auto space-y-2">
          <p className="font-medium text-gray-700">
            Team Syntax Error – Our First Hackathon Project
          </p>

          <p>
            This is a basic prototype built during our very first hackathon.
            <br />
            The app is still under development and not fully complete.
          </p>

          <div className="pt-1">
            <p className="font-medium text-gray-600">Team Members:</p>
            <p>
              • Deep Paira <span className="text-gray-400">(Team Lead)</span>
            </p>
            <p>
              •Niharika Kumari{" "}
              <span className="text-gray-400">(Integration)</span>
            </p>
            <p>
              • Ujjal Das <span className="text-gray-400">(Backend)</span>
            </p>
            <p>
              • Gopal Mahato{" "}
              <span className="text-gray-400">(Mobile App - PWA)</span>
            </p>
          </div>

          <p className="pt-2 italic text-gray-600">
            We didn't win this time — but this was our first real step into
            building something meaningful.
            <br />
            The journey has just begun! 🐾
          </p>
        </div>
      </footer>
    </div>
  );
}

function StatCard({ label, value, emoji }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
      <span className="text-2xl">{emoji}</span>
      <div>
        <p className="text-xl font-bold text-gray-900">{value}</p>
        <p className="text-xs text-gray-400">{label}</p>
      </div>
    </div>
  );
}
