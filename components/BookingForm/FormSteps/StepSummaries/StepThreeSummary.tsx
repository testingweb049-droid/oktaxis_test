import { FolderPen, Phone, Mail, Briefcase, PersonStanding, Baby, StickyNote } from 'lucide-react';

interface StepThreeSummaryProps {
    passengerInfo: {
      name: string;
      email: string;
      phone: string;
    };
    bagCount: string;
    passengerCount: string;
    passengerNotes?: string;
    textarea: string;
    childCount: string;
  }
  
  const StepThreeSummary = ({
    passengerInfo,
    bagCount,
    passengerCount,
    passengerNotes,
    textarea,
    childCount,
  }: StepThreeSummaryProps) => {
    return (
      <div className="w-[320px] lg:w-full bg-white shadow-lg rounded-lg px-6 py-2 text-gray-800 space-y-2">
        <h2 className="text-[16px] font-bold mb-3 border-b pb-1">Passenger Info Summary</h2>
  
        <div className="flex items-center gap-2">
          <FolderPen className="text-brand w-4 h-4" />
          <p className="font-semibold text-base">Name:</p>
          <span className="text-base">{passengerInfo?.name || 'Not Provided'}</span>
        </div>
  
        <div className="flex items-center gap-2">
          <Phone className="text-brand w-4 h-4" />
          <p className="font-semibold text-base">Phone:</p>
          <span className="text-base">{passengerInfo?.phone || 'Not Provided'}</span>
        </div>
  
        <div className="flex items-center gap-2">
          <Mail className="text-sky-500 w-4 h-4" />
          <p className="font-semibold text-base">Email:</p>
          <span className="text-base">{passengerInfo?.email || 'Not Provided'}</span>
        </div>
  
        <div className="flex items-center gap-2">
          <Briefcase className="text-gray-500 w-4 h-4" />
          <p className="font-semibold text-base">Bags:</p>
          <span className="text-base">{bagCount || 'Not Provided'}</span>
        </div>
  
        <div className="flex items-center gap-2">
          <PersonStanding className="text-blue-500 w-4 h-4" />
          <p className="font-semibold text-base">Passengers:</p>
          <span className="text-base">{passengerCount || 'Not Provided'}</span>
        </div>

        <div className="flex items-center gap-2">
          <Baby className="text-brand w-4 h-4" />
          <p className="font-semibold text-base">Children:</p>
          <span className="text-base">{childCount || ''}</span>
        </div>

        <div className="flex items-center gap-2">
          <StickyNote className="text-stone-500 w-4 h-4" />
          <p className="font-semibold text-base">Passenger Instructions:</p>
          <span className="text-base">{textarea || 'Not Provided'}</span>
        </div>
  
        {passengerNotes && (
          <div className="flex flex-col gap-2">
            {/* <RockingChair className="text-blue-500 w-4 h-4" /> */}
            <p className="font-semibold text-base">Notes:</p>
            <div className="bg-gray-100 rounded-lg p-2">
              <span className="text-base">{passengerNotes}</span>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default StepThreeSummary;
  