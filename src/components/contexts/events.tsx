import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type EventType = {
  id: string;
  name: string;
  date: Date;
  seatsAvailable: number;
  seatsBooked: number;
  paymentOptions: string;
  description?: string;
};

type EventsContextType = {
  events: EventType[];
  isLoading: boolean;
  error: string;
  getEventById?: (id: string) => EventType | undefined;
};

const EventsContext = createContext<EventsContextType>({
  events: [],
  isLoading: false,
  error: "",
});

export const EventsProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const getEventById = (id: string) => events.find((ev) => ev.id === id);
  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      setError("");
      try {
        const res = await fetch(
          "https://docs.google.com/spreadsheets/d/e/2PACX-1vRKrOtcetMw93GVvVQJhERspCSS9ubsvmqll_aFd0_caNJJwT3Z-T05XcWvDIs6UIPJHeuqVF92V7uY/pub?output=csv"
        );
        const data = await res.text();
        const rows = data.split("\n").map((row) => row.split(","));

        const eventsData: EventType[] = rows
          .slice(1) // Skip header row
          .map((row) => ({
            id: row[0],
            name: row[1],
            date: new Date(
              parseInt(row[2].substring(row[2].length - 4)),
              parseInt(row[2].substring(0, 2)) - 1,
              parseInt(row[2].substring(3, 5))
            ),
            seatsAvailable: parseInt(row[3]),
            seatsBooked: parseInt(row[4]),
            paymentOptions: row[5],
            description: row[6],
          }));
        setEvents(eventsData);
      } catch (err) {
        setError("Failed to fetch events data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <EventsContext.Provider value={{ events, isLoading, error, getEventById }}>
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error("useEvents must be used within an EventsProvider");
  }

  return context;
};
