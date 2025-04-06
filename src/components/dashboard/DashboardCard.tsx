
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  className?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  icon,
  link,
  className,
}) => {
  return (
    <div className={cn("bg-white rounded-md border p-4 flex flex-col", className)}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-gray-700 font-medium">{title}</h3>
        <div className="text-sm text-gray-500">
          Options
        </div>
      </div>
      <Link to={link} className="flex-grow flex flex-col items-center justify-center py-6">
        <div className="bg-eduBlue text-white p-8 rounded-full mb-4">
          {icon}
        </div>
        <h3 className="font-medium text-gray-800 mb-1">{title}</h3>
        <p className="text-sm text-gray-600 text-center">{description}</p>
      </Link>
    </div>
  );
};

export default DashboardCard;
