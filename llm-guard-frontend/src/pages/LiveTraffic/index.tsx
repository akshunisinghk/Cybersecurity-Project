import { liveTraffic, type LiveTraffic } from "../../mock/liveTraffic";
import SecurityMetricCard from "../../components/dashboard/SecurityMetricCard";
import ThreatAlertCard from "../../components/dashboard/ThreatAlertCard";

import {
  Activity,
  ShieldAlert,
  ShieldCheck,
  Clock,
} from "lucide-react";


const LiveTrafficPage = () => {

  const traffic: LiveTraffic[] = liveTraffic;


  // Metrics

  const totalRequests = traffic.length;


  const blockedAttacks = traffic.filter(
    (item) => item.status === "Blocked"
  ).length;



  const activeThreats = traffic.filter(
    (item) =>
      item.status === "Blocked" ||
      item.status === "Flagged"
  ).length;



  const averageLatency =
    traffic.length > 0
      ? Math.round(
          traffic.reduce(
            (sum,item)=> sum + item.latency,
            0
          ) / traffic.length
        )
      : 0;



  const alerts = traffic.filter(
    (item)=>
      item.status === "Blocked" ||
      item.status === "Flagged"
  );



  return (

    <div className="p-6 text-gray-200">


      {/* Header */}

      <div className="mb-6">

        <h1 className="text-2xl font-bold text-gray-100">
          Live Traffic
        </h1>


        <p className="mt-1 text-gray-400">
          Monitor real-time LLM requests and security activity.
        </p>

      </div>





      {/* Security Cards */}

      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">


        <SecurityMetricCard
          title="Total Requests"
          value={totalRequests}
          description="Incoming AI requests"
          icon={<Activity size={20}/>}
        />



        <SecurityMetricCard
          title="Blocked Attacks"
          value={blockedAttacks}
          description="Threats prevented"
          icon={<ShieldCheck size={20}/>}
        />



        <SecurityMetricCard
          title="Active Threats"
          value={activeThreats}
          description="Needs attention"
          icon={<ShieldAlert size={20}/>}
        />



        <SecurityMetricCard
          title="Average Latency"
          value={`${averageLatency} ms`}
          description="Firewall response time"
          icon={<Clock size={20}/>}
        />


      </div>






      {/* Alert Panel */}

      <div className="mb-6 rounded-xl border border-gray-700 bg-gray-900 p-5">


        <div className="mb-4 flex justify-between">

          <h2 className="text-xl font-bold text-red-400">
            🚨 Active Security Alerts
          </h2>


          <span className="rounded-full bg-red-600 px-3 py-1">
            {alerts.length} Active
          </span>


        </div>



        <div className="grid gap-4 md:grid-cols-2">


          {
            alerts.length === 0 ?

            (
              <p className="text-gray-400">
                No active threats detected.
              </p>
            )

            :

            alerts.slice(0,4).map((alert)=>(


              <ThreatAlertCard

                key={alert.id}

                severity={
                  alert.status === "Blocked"
                  ? "High"
                  : "Medium"
                }

                title={alert.requestType}

                source={alert.source}

                target={alert.destination}

                time={alert.timestamp}

              />


            ))

          }


        </div>


      </div>






      {/* Traffic Table */}


      <div className="overflow-x-auto rounded-xl border border-gray-700 bg-gray-900">


        <table className="w-full">


          <thead>

            <tr className="bg-gray-800 text-gray-300">


              <th className="p-3 text-left">
                Time
              </th>


              <th className="p-3 text-left">
                Source
              </th>


              <th className="p-3 text-left">
                Destination
              </th>


              <th className="p-3 text-left">
                Request Type
              </th>


              <th className="p-3 text-left">
                Status
              </th>


              <th className="p-3 text-left">
                Latency
              </th>


            </tr>


          </thead>



          <tbody>


          {
            traffic.map((item)=>(


              <tr
                key={item.id}
                className="border-t border-gray-700 hover:bg-gray-800"
              >


                <td className="p-3">
                  {item.timestamp}
                </td>


                <td className="p-3">
                  {item.source}
                </td>


                <td className="p-3">
                  {item.destination}
                </td>


                <td className="p-3">
                  {item.requestType}
                </td>



                <td className="p-3">


                  <span
                    className={`rounded-full px-3 py-1 text-sm ${
                      item.status === "Blocked"
                      ? "bg-red-900 text-red-300"
                      : item.status === "Flagged"
                      ? "bg-yellow-900 text-yellow-300"
                      : "bg-green-900 text-green-300"
                    }`}
                  >

                    {item.status}

                  </span>


                </td>



                <td className="p-3">
                  {item.latency} ms
                </td>



              </tr>


            ))
          }


          </tbody>


        </table>


      </div>


    </div>

  );
};


export default LiveTrafficPage;