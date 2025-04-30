import { IProfileProps } from "../type/Profile.type";

interface IProfileCardProps {
  data: IProfileProps;
}
export const ProfileCard = ({ data }: IProfileCardProps) => {
  return (
    <div className="max-w-5xl mx-auto p-10 bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col md:flex-row items-center gap-10">
      <div>
        <img
          src={data.profileImageUrl}
          alt={data.name}
          className="w-48 h-48 rounded-full object-cover border-4 border-indigo-500 shadow-md"
        />
      </div>

      <div className="flex-1 text-center md:text-left space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h2 className="text-4xl font-bold text-gray-800">@{data.name}</h2>
          <span
            className={`text-sm px-4 py-1 rounded-full font-semibold ${
              data.isActive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
            }`}
          >
            {data.isActive ? "Active" : "Inactive"}
          </span>
        </div>

        <p className="text-lg text-gray-600">{data.email}</p>

        <p className="text-base text-gray-700 leading-relaxed">{data.bio}</p>

        <span className="inline-block bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold">
          {data.role.charAt(0).toUpperCase() + data.role.slice(1)}
        </span>
      </div>
    </div>
  );
};
