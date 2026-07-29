import { useEffect, useState } from "react";
import SecurityMetricCard from "../../components/dashboard/SecurityMetricCard";
import ThreatAlertCard from "../../components/dashboard/ThreatAlertCard";

import {
  Activity,
  ShieldAlert,
  ShieldCheck,
  Clock,
} from "lucide-react";


interface Traffic {
  id: number;
  source: string;
  destination: string;
  requestType: string;
  status: "Allowed" | "Blocked" | "Flagged";
  latency: string;
  threat: "Low" | "Medium" | "High";
  time: string;
}


const LiveTraffic = () => {

  const [traffic, setTraffic] = useState<Traffic[]>([]);
  const [isRunning, setIsRunning] = useState(true);

  const [selectedTraffic, setSelectedTraffic] =
    useState<Traffic | null>(null);



  useEffect(() => {

    if (!isRunning) return;


    const interval = setInterval(() => {


      const newTraffic: Traffic = {

        id: Date.now(),

        source:
          `User-00${Math.floor(Math.random() * 9) + 1}`,


        destination:
          Math.random() > 0.5
            ? "GPT Model"
            : "Claude Model",


        requestType:
          Math.random() > 0.7
            ? "Prompt Injection"
            : Math.random() > 0.5
            ? "Sensitive Data"
            : "Prompt",


        status:
          Math.random() > 0.7
            ? "Blocked"
            : Math.random() > 0.5
            ? "Flagged"
            : "Allowed",


        latency:
          `${Math.floor(Math.random() * 150 + 80)} ms`,


        threat:
          Math.random() > 0.7
            ? "High"
            : Math.random() > 0.5
            ? "Medium"
            : "Low",


        time:
          new Date().toLocaleTimeString(),

      };


      setTraffic((prev) =>
        [newTraffic, ...prev].slice(0,10)
      );


    },3000);



    return () => clearInterval(interval);


  },[isRunning]);





  // Security Metrics

  const totalRequests = traffic.length;



  const blockedAttacks = traffic.filter(
    (item)=> item.status === "Blocked"
  ).length;



  const activeThreats = traffic.filter(
    (item)=>
      item.threat === "Medium" ||
      item.threat === "High"
  ).length;



  const averageLatency =
    traffic.length > 0
      ? Math.round(
          traffic.reduce(
            (sum,item)=>
              sum +
              Number(
                item.latency.replace(" ms","")
              ),
            0
          ) / traffic.length
        ) + " ms"
      : "0 ms";




  // Active Alerts

  const alerts = traffic.filter(
    (item)=>
      item.status === "Blocked" ||
      item.threat === "High"
  );




  return (

    <div className="min-h-screen bg-gray-950 p-6 text-white">



      {/* Header */}

      <div className="mb-6 flex items-center justify-between">


        <div>

          <h1 className="text-4xl font-bold text-cyan-400">
            Live Traffic
          </h1>


          <p className="mt-2 text-gray-400">
            Monitor real-time LLM requests and security activity.
          </p>


        </div>



        <button
          onClick={()=>setIsRunning(!isRunning)}
          className="rounded-lg bg-cyan-600 px-5 py-2 hover:bg-cyan-500"
        >

          {isRunning ? "Pause" : "Resume"}

        </button>


      </div>






      {/* Security Metric Cards */}


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
          description="Requires monitoring"
          icon={<ShieldAlert size={20}/>}
        />



        <SecurityMetricCard
          title="Average Latency"
          value={averageLatency}
          description="Firewall response time"
          icon={<Clock size={20}/>}
        />


      </div>







      {/* Active Security Alerts */}


      <div className="mb-6 rounded-xl border border-gray-700 bg-gray-950 p-5">


        <div className="mb-4 flex items-center justify-between">


          <h2 className="text-xl font-bold text-red-400">
            🚨 Active Security Alerts
          </h2>



          <span className="rounded-full bg-red-600 px-3 py-1 text-sm">
            {alerts.length} Active
          </span>


        </div>




        <div className="grid gap-4 md:grid-cols-2">


          {
            alerts.length === 0 ? (

              <p className="text-gray-400">
                No active threats detected.
              </p>

            ) : (


              alerts.slice(0,4).map((alert)=>(


                <ThreatAlertCard

                  key={alert.id}

                  severity={alert.threat}

                  title={alert.requestType}

                  source={alert.source}

                  target={alert.destination}

                  time={alert.time}

                  onClick={()=>
                    setSelectedTraffic(alert)
                  }

                />


              ))

            )

          }


        </div>


      </div>








      {/* Traffic Table */}



      <div className="overflow-x-auto rounded-xl border border-gray-700 bg-gray-900">


        <table className="min-w-full">


          <thead className="bg-gray-800">

            <tr>

              <th className="px-6 py-4 text-left">
                Time
              </th>

              <th className="px-6 py-4 text-left">
                Source
              </th>

              <th className="px-6 py-4 text-left">
                Destination
              </th>

              <th className="px-6 py-4 text-left">
                Request Type
              </th>

              <th className="px-6 py-4 text-left">
                Status
              </th>

              <th className="px-6 py-4 text-left">
                Latency
              </th>

            </tr>

          </thead>




          <tbody>


            {
              traffic.map((item)=>(


                <tr

                  key={item.id}

                  onClick={()=>
                    setSelectedTraffic(item)
                  }

                  className="cursor-pointer border-t border-gray-700 hover:bg-gray-800"

                >


                  <td className="px-6 py-4">
                    {item.time}
                  </td>



                  <td className="px-6 py-4">
                    {item.source}
                  </td>



                  <td className="px-6 py-4">
                    {item.destination}
                  </td>



                  <td className="px-6 py-4">
                    {item.requestType}
                  </td>




                  <td className="px-6 py-4">


                    <span
                      className={`rounded-full px-3 py-1 text-sm ${
                        
                        item.status === "Blocked"
                          ? "bg-red-600"
                          : item.status === "Flagged"
                          ? "bg-yellow-600"
                          : "bg-green-600"

                      }`}
                    >

                      {item.status}

                    </span>


                  </td>



                  <td className="px-6 py-4">
                    {item.latency}
                  </td>



                </tr>


              ))
            }


          </tbody>


        </table>


      </div>






      {/* Threat Modal */}


      {
        selectedTraffic && (

          <div className="fixed inset-0 flex items-center justify-center bg-black/60">


            <div className="w-full max-w-lg rounded-xl border border-gray-700 bg-gray-900 p-6">


              <h2 className="mb-5 text-2xl font-bold text-cyan-400">
                Threat Analysis
              </h2>



              <div className="space-y-3 text-gray-300">


                <p>
                  Source: {selectedTraffic.source}
                </p>


                <p>
                  Destination: {selectedTraffic.destination}
                </p>


                <p>
                  Request Type: {selectedTraffic.requestType}
                </p>


                <p>
                  Status: {selectedTraffic.status}
                </p>


                <p>
                  Threat Level: {selectedTraffic.threat}
                </p>


                <p>
                  Latency: {selectedTraffic.latency}
                </p>


              </div>




              <button

                onClick={()=>
                  setSelectedTraffic(null)
                }

                className="mt-6 rounded-lg bg-cyan-600 px-5 py-2 hover:bg-cyan-500"

              >

                Close

              </button>



            </div>


          </div>


        )
      }




    </div>

  );

};



export default LiveTraffic;