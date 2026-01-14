import { useEffect, useState } from "react";
import UserCard from "./UserCard"
import { GetAllProjects, GetAllTasks, GetAllUsers } from "@/api/queries/user";



const Adminpage = () => {
    const [counts, setCounts] = useState({ project: 0, task: 0, user: 0, report: 0, issue: 0 });

    useEffect(() => {
        const fetchTasks = async () => {
            const { data: allTask } = await GetAllTasks();
            const { data: allUser } = await GetAllUsers();
            const { data: allProject } = await GetAllProjects();
            setCounts({
                project: allProject?.length || 0,
                task: allTask?.length || 0,
                user: allUser?.users?.length || 0,
                report: 0,
                issue: 0,
            });
            console.log('allTask', allTask.length);
            console.log('allUser', allUser.users.length);
            console.log('allProject', allProject.length);

        };
        fetchTasks();
    }, []);

    return (
        <>
            <div className="bg-gray-100 rounded-xl shadow-md p-6 mb-6">
                <div className="flex flex-col lg:flex-row gap-6">

                    {/* LEFT SECTION */}
                    <div className="w-full lg:w-2/3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                            <UserCard type="Users" count={counts.user || "-"} />
                            <UserCard type="Projects" count={counts.project || "-"} />
                            <UserCard type="Tasks" count={counts.task || "-"} />
                            <UserCard type="Reports" count={counts.report || "-"} />
                        </div>

                        {/* Chart Placeholder */}
                        <div className="mt-6 bg-white rounded-xl shadow-sm p-4 h-48 flex items-center justify-center text-gray-400">
                            Charts coming soon 📊
{/* 
                            <PieChart width={400} height={400}>
                                <Pie
                                    activeShape={{
                                        fill: 'red',
                                    }}
                                    data={[
                                        { name: 'Page A', uv: 590 },
                                        { name: 'Page B', uv: 590 },
                                        { name: 'Page C', uv: 868 },
                                    ]}
                                    dataKey="uv"
                                    isAnimationActive={isAnimationActive}
                                />
                                <Tooltip defaultIndex={2} />
                            </PieChart> */}
                        </div>
                    </div>

                    {/* RIGHT SECTION */}
                    <div className="w-full lg:w-1/3">
                        <div className="bg-white rounded-xl shadow-sm p-5 h-full hover:shadow-lg transition-shadow">
                            <h3 className="text-lg font-semibold mb-2">Quick Insights</h3>
                            <p className="text-sm text-gray-500">
                                View recent updates, alerts, or summaries here.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Adminpage