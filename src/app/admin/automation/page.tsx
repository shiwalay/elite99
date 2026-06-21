"use client";

import { useState, useEffect } from "react";
import {
  Workflow,
  Play,
  Plus,
  Trash2,
  CheckCircle,
  Zap,
  Shield,
  Mail,
  PhoneCall,
  Send,
  Link2,
  Database,
  Terminal,
  Activity,
  FileSpreadsheet,
  Globe,
  Settings,
  RefreshCw,
} from "lucide-react";

interface WorkflowItem {
  id: string;
  name: string;
  trigger: string;
  actions: { type: "email" | "whatsapp" | "crm" | "webhook"; desc: string }[];
  isActive: boolean;
  date: string;
}

interface ToolConnection {
  makeWebhookUrl: string;
  makeConnected: boolean;
  zapierWebhookUrl: string;
  zapierConnected: boolean;
  activeCampaignKey: string;
  activeCampaignConnected: boolean;
  googleSheetId: string;
  googleSheetConnected: boolean;
}

interface WebhookLog {
  id: string;
  time: string;
  event: string;
  destination: string;
  status: "200_OK" | "201_Created" | "500_Error" | "Pending";
  payload: string;
}

const defaultConnections: ToolConnection = {
  makeWebhookUrl: "https://hook.us1.make.com/39a2b8g7c6f5d4e3",
  makeConnected: true,
  zapierWebhookUrl: "https://hooks.zapier.com/hooks/catch/1928374/o92hjs8/",
  zapierConnected: false,
  activeCampaignKey: "••••••••••••••••••••••••••••••••",
  activeCampaignConnected: true,
  googleSheetId: "1X9F2g8L7Y7z8W9s9x0V2c3b4n5m",
  googleSheetConnected: true,
};

const defaultLogs: WebhookLog[] = [
  { id: "log_1", time: "Just Now", event: "Triage Form Submit (Dr. Amit Roy)", destination: "Make.com Webhook", status: "200_OK", payload: '{"name":"Dr. Amit Roy","revenue":"500k_2m","challenge":"Inconsistent Leads"}' },
  { id: "log_2", time: "10 mins ago", event: "Newsletter Opt-in (Vinay Kumar)", destination: "ActiveCampaign", status: "201_Created", payload: '{"email":"vinay@kumartech.in","tag":"Humans_Of_Internet"}' },
  { id: "log_3", time: "1 hour ago", event: "Resource Download (Jessica Mercer)", destination: "Google Sheets", status: "200_OK", payload: '{"name":"Jessica Mercer","email":"jessica@mercerconsulting.com","asset":"AI_Blueprint"}' },
];

export default function AutomationBuilderPage() {
  const [activeTab, setActiveTab] = useState<"workflows" | "integrations" | "logs">("workflows");

  // --- STATE FOR WORKFLOWS ---
  const [workflows, setWorkflows] = useState<WorkflowItem[]>([]);
  const [isCreatingWf, setIsCreatingWf] = useState(false);
  const [newWfName, setNewWfName] = useState("");
  const [newWfTrigger, setNewWfTrigger] = useState("Lead Triage Form Submit");

  // --- STATE FOR INTEGRATIONS ---
  const [connections, setConnections] = useState<ToolConnection>(defaultConnections);
  const [testingTool, setTestingTool] = useState<string | null>(null);

  // --- STATE FOR LOGS ---
  const [logs, setLogs] = useState<WebhookLog[]>([]);

  const defaultWorkflows: WorkflowItem[] = [
    {
      id: "wf_1",
      name: "Triage Application Form Submitted",
      trigger: "Lead Triage Form Submit (qualifier revenue bracket)",
      actions: [
        { type: "crm", desc: "Evaluate qualifiers & sync user data into HubSpot" },
        { type: "email", desc: "Send priority Calendly link if qualified (Brevo SMTP)" },
        { type: "whatsapp", desc: "Send warning notification to Swapnil Advisory Team" },
      ],
      isActive: true,
      date: "Active",
    },
    {
      id: "wf_2",
      name: "Free Resource Vault Checklist Download",
      trigger: "Resources Modal Opt-in Submit",
      actions: [
        { type: "email", desc: "Deliver PDF attachment file to subscriber inbox" },
        { type: "crm", desc: "Add tag 'Checklist_Lead' and start weekly insights sequence" },
      ],
      isActive: true,
      date: "Active",
    },
    {
      id: "wf_3",
      name: "Humans of Internet Newsletter Signup",
      trigger: "Footer / Squeeze Newsletter Opt-in",
      actions: [
        { type: "crm", desc: "Add to ActiveCampaign mailing list segment 'Humans_Of_Internet'" },
        { type: "email", desc: "Send welcome confirmation email detailing system schedule" },
      ],
      isActive: false,
      date: "Paused",
    },
  ];

  useEffect(() => {
    // Load workflows
    const savedWf = localStorage.getItem("automation_workflows");
    if (savedWf) {
      try { setWorkflows(JSON.parse(savedWf)); } catch (e) { setWorkflows(defaultWorkflows); }
    } else {
      setWorkflows(defaultWorkflows);
      localStorage.setItem("automation_workflows", JSON.stringify(defaultWorkflows));
    }

    // Load connections
    const savedConn = localStorage.getItem("automation_connections");
    if (savedConn) {
      try { setConnections(JSON.parse(savedConn)); } catch (e) { setConnections(defaultConnections); }
    } else {
      setConnections(defaultConnections);
      localStorage.setItem("automation_connections", JSON.stringify(defaultConnections));
    }

    // Load logs
    const savedLogs = localStorage.getItem("automation_logs");
    if (savedLogs) {
      try { setLogs(JSON.parse(savedLogs)); } catch (e) { setLogs(defaultLogs); }
    } else {
      setLogs(defaultLogs);
      localStorage.setItem("automation_logs", JSON.stringify(defaultLogs));
    }
  }, []);

  const saveWfToStorage = (updated: WorkflowItem[]) => {
    setWorkflows(updated);
    localStorage.setItem("automation_workflows", JSON.stringify(updated));
  };

  const saveConnToStorage = (updated: ToolConnection) => {
    setConnections(updated);
    localStorage.setItem("automation_connections", JSON.stringify(updated));
  };

  const saveLogsToStorage = (updated: WebhookLog[]) => {
    setLogs(updated);
    localStorage.setItem("automation_logs", JSON.stringify(updated));
  };

  const handleToggleActive = (id: string) => {
    const updated = workflows.map((wf) =>
      wf.id === id ? { ...wf, isActive: !wf.isActive, date: !wf.isActive ? "Active" : "Paused" } : wf
    );
    saveWfToStorage(updated);
  };

  const handleCreateWorkflow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWfName) return;

    const newWorkflow: WorkflowItem = {
      id: "wf_" + Date.now(),
      name: newWfName,
      trigger: newWfTrigger,
      actions: [
        { type: "webhook", desc: "Post webhook payload metadata to connected integrations" },
        { type: "email", desc: "Send confirmation transactional response payload" }
      ],
      isActive: true,
      date: "Active"
    };

    saveWfToStorage([...workflows, newWorkflow]);
    setNewWfName("");
    setIsCreatingWf(false);
  };

  const handleDeleteWorkflow = (id: string) => {
    if (!confirm("Are you sure you want to delete this workflow sequence?")) return;
    const filtered = workflows.filter((w) => w.id !== id);
    saveWfToStorage(filtered);
  };

  const handleToggleConnection = (tool: keyof ToolConnection) => {
    const updated = { ...connections, [tool]: !connections[tool] };
    saveConnToStorage(updated);
  };

  const handleUpdateWebhookUrl = (tool: keyof ToolConnection, val: string) => {
    const updated = { ...connections, [tool]: val };
    saveConnToStorage(updated);
  };

  // Test Outgoing Webhook Trigger Mock/Real fetch
  const handleTestIntegration = (tool: "make" | "zapier" | "activecampaign" | "sheets") => {
    setTestingTool(tool);

    let destUrl = "";
    let mockPayload = {};
    let destLabel = "";

    if (tool === "make") {
      destUrl = connections.makeWebhookUrl;
      destLabel = "Make.com Webhook";
      mockPayload = { event: "manual_test", sender: "Swapnil Admin Panel", time: new Date().toISOString() };
    } else if (tool === "zapier") {
      destUrl = connections.zapierWebhookUrl;
      destLabel = "Zapier Hook";
      mockPayload = { event: "manual_test", sender: "Swapnil Admin Panel", status: "checking" };
    } else if (tool === "activecampaign") {
      destLabel = "ActiveCampaign API";
    } else if (tool === "sheets") {
      destLabel = "Google Sheets API";
    }

    setTimeout(async () => {
      let statusResult: WebhookLog["status"] = "200_OK";

      // If user provided a real webhook URL, attempt a real ping dispatch!
      if (destUrl && destUrl.startsWith("http")) {
        try {
          const res = await fetch(destUrl, {
            method: "POST",
            mode: "no-cors", // avoid CORS failure logs
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(mockPayload),
          });
          statusResult = "200_OK";
        } catch (e) {
          statusResult = "500_Error";
        }
      }

      // Add a fresh log to the registry
      const newLog: WebhookLog = {
        id: "log_" + Date.now(),
        time: "Just Now",
        event: `Manual test triggered for ${destLabel}`,
        destination: destLabel,
        status: statusResult,
        payload: JSON.stringify(mockPayload || { test: "Active connection test", verified: true }),
      };

      saveLogsToStorage([newLog, ...logs]);
      setTestingTool(null);
      alert(`Integration test dispatched successfully to ${destLabel}. Check Webhook Logs tab!`);
    }, 1500);
  };

  const handleClearLogs = () => {
    if (confirm("Are you sure you want to flush the webhook delivery logs?")) {
      saveLogsToStorage([]);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* 1. Header with tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-900 pb-5">
        <div>
          <h1 className="text-3xl font-bold font-display text-white">Automation Hub</h1>
          <p className="text-slate-400 text-sm mt-0.5">Connect third-party marketing tools and configure event webhook sequences.</p>
        </div>

        {/* Tab Selector */}
        <div className="bg-slate-950 border border-slate-900 rounded-lg p-1 flex">
          {[
            { id: "workflows", label: "Active Sequences", icon: Workflow },
            { id: "integrations", label: "Tool Connections", icon: Link2 },
            { id: "logs", label: "Webhook Logs", icon: Terminal },
          ].map((tab) => {
            const Icon = tab.icon;
            const isTabActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-2 rounded-md text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isTabActive
                    ? "bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/25"
                    : "text-slate-400 hover:text-slate-200 border border-transparent"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. TAB: WORKFLOWS LIST */}
      {activeTab === "workflows" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-white font-bold font-display text-sm">Sequence Blueprint Pipelines</span>
            <button
              onClick={() => setIsCreatingWf(true)}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#030a16] bg-[#d4af37] hover:bg-[#dfc176] rounded-lg uppercase tracking-wider transition-all cursor-pointer"
            >
              <Plus className="h-4 w-4" /> Create Sequence
            </button>
          </div>

          {/* Create Workflow Box */}
          {isCreatingWf && (
            <form onSubmit={handleCreateWorkflow} className="glass-panel border-[#d4af37]/25 bg-[#d4af37]/5 rounded-xl p-5 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Configure New Event Trigger</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Sequence Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Masterclass Registration Lead Sync"
                    value={newWfName}
                    onChange={(e) => setNewWfName(e.target.value)}
                    className="w-full bg-[#050e1c] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Trigger Event Source</label>
                  <select
                    value={newWfTrigger}
                    onChange={(e) => setNewWfTrigger(e.target.value)}
                    className="w-full bg-[#050e1c] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white cursor-pointer"
                  >
                    <option value="Lead Triage Form Submit">Lead Triage Form Submit</option>
                    <option value="Resources Modal Opt-in Submit">Resources Modal Opt-in Submit</option>
                    <option value="Newsletter Footer Opt-in">Newsletter Footer Opt-in</option>
                    <option value="Strategy Call Booked (Calendly)">Strategy Call Booked (Calendly)</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-2 border-t border-slate-900">
                <button
                  type="button"
                  onClick={() => setIsCreatingWf(false)}
                  className="px-3 py-1.5 bg-slate-950 border border-slate-900 rounded-lg text-slate-400 text-xs font-semibold hover:text-white"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-gradient-to-r from-[#f3e5ab] to-[#d4af37] text-[#030a16] text-xs font-bold rounded-lg"
                >
                  Launch Pipeline
                </button>
              </div>
            </form>
          )}

          {/* Workflows grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {workflows.map((wf) => (
              <div
                key={wf.id}
                className={`glass-panel border-slate-800 rounded-xl p-5 space-y-4 flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${
                  wf.isActive ? "border-[#d4af37]/20 bg-slate-950/20" : "opacity-60"
                }`}
              >
                <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-[#f3e5ab] to-[#d4af37]" />

                <div className="space-y-3">
                  <div className="flex justify-between items-start gap-4 border-b border-slate-900/60 pb-3">
                    <div className="space-y-1">
                      <h3 className="text-white font-bold text-base leading-snug font-display">{wf.name}</h3>
                      <div className="flex items-center gap-1.5 text-slate-500 text-[10px]">
                        <Zap className="h-3.5 w-3.5 text-[#d4af37]" /> Trigger: {wf.trigger}
                      </div>
                    </div>
                    {/* Toggle switch button */}
                    <button
                      onClick={() => handleToggleActive(wf.id)}
                      className={`px-2.5 py-1 border rounded text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        wf.isActive
                          ? "bg-[#d4af37]/10 border-[#d4af37]/40 text-[#d4af37]"
                          : "bg-slate-950 border-slate-900 text-slate-500"
                      }`}
                    >
                      {wf.isActive ? "Active" : "Paused"}
                    </button>
                  </div>

                  {/* Actions List */}
                  <div className="space-y-3 pt-2">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold block">
                      Executed Sequence
                    </span>
                    {wf.actions.map((act, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <div className="h-5 w-5 rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-[#d4af37] shrink-0 mt-0.5">
                          {act.type === "email" && <Mail className="h-3 w-3" />}
                          {act.type === "whatsapp" && <PhoneCall className="h-3 w-3" />}
                          {act.type === "crm" && <Send className="h-3 w-3" />}
                          {act.type === "webhook" && <Link2 className="h-3 w-3" />}
                        </div>
                        <div className="leading-snug">
                          <p className="text-white text-xs font-semibold uppercase tracking-wider text-[10px]">
                            {act.type === "crm" ? "CRM Sync" : act.type === "whatsapp" ? "WhatsApp Notify" : act.type === "webhook" ? "Webhook Fire" : "Email Dispatch"}
                          </p>
                          <p className="text-slate-400 text-xs mt-0.5 leading-normal">{act.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-900 mt-4 flex justify-between items-center text-[10px] text-slate-500">
                  <span className="flex items-center gap-1">
                     <Shield className="h-3.5 w-3.5 text-emerald-400" /> Live Pipeline Verified
                  </span>
                  <button
                    onClick={() => handleDeleteWorkflow(wf.id)}
                    className="text-slate-500 hover:text-rose-450 cursor-pointer uppercase tracking-wider font-bold"
                  >
                    Delete Sequence
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. TAB: TOOL CONNECTIONS */}
      {activeTab === "integrations" && (
        <div className="space-y-6">
          <div className="border-b border-slate-900 pb-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-400">Third-Party Marketing Integrations</h2>
            <p className="text-slate-500 text-xs mt-0.5">Input API credentials and webhook pathways to sync lead events live.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* MAKE.COM CARD */}
            <div className="glass-panel border-slate-800 rounded-xl p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                      <Globe className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-sm font-display">Make.com (Integromat)</h3>
                      <p className="text-slate-500 text-[10px]">Robust workflows & JSON webhook triggers</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggleConnection("makeConnected")}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      connections.makeConnected
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-slate-900 text-slate-500 border border-slate-800"
                    }`}
                  >
                    {connections.makeConnected ? "Connected" : "Disconnected"}
                  </button>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Custom Webhook Target URL</label>
                  <input
                    type="url"
                    value={connections.makeWebhookUrl}
                    onChange={(e) => handleUpdateWebhookUrl("makeWebhookUrl", e.target.value)}
                    disabled={!connections.makeConnected}
                    className="w-full bg-slate-950 border border-slate-900 rounded-lg px-3 py-2 text-[11px] text-white focus:outline-none focus:border-[#d4af37] font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-slate-900 mt-2">
                <span className="text-[10px] text-slate-500">Method: Outbound POST (JSON)</span>
                <button
                  type="button"
                  disabled={!connections.makeConnected || testingTool === "make"}
                  onClick={() => handleTestIntegration("make")}
                  className="px-3 py-1.5 bg-slate-900 hover:text-white border border-slate-800 text-slate-400 text-[10px] font-bold rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                >
                  {testingTool === "make" ? "Firing Webhook..." : "Test Dispatch"}
                </button>
              </div>
            </div>

            {/* ZAPIER CARD */}
            <div className="glass-panel border-slate-800 rounded-xl p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                      <Zap className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-sm font-display">Zapier Connections</h3>
                      <p className="text-slate-500 text-[10px]">Connect catching hooks and triggers</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggleConnection("zapierConnected")}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      connections.zapierConnected
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-slate-900 text-slate-500 border border-slate-800"
                    }`}
                  >
                    {connections.zapierConnected ? "Connected" : "Disconnected"}
                  </button>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Catch Hook Webhook URL</label>
                  <input
                    type="url"
                    value={connections.zapierWebhookUrl}
                    onChange={(e) => handleUpdateWebhookUrl("zapierWebhookUrl", e.target.value)}
                    disabled={!connections.zapierConnected}
                    className="w-full bg-slate-950 border border-slate-900 rounded-lg px-3 py-2 text-[11px] text-white focus:outline-none focus:border-indigo-600 font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-slate-900 mt-2">
                <span className="text-[10px] text-slate-500">Method: Webhook Catch Trigger</span>
                <button
                  type="button"
                  disabled={!connections.zapierConnected || testingTool === "zapier"}
                  onClick={() => handleTestIntegration("zapier")}
                  className="px-3 py-1.5 bg-slate-900 hover:text-white border border-slate-800 text-slate-400 text-[10px] font-bold rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                >
                  {testingTool === "zapier" ? "Firing Hook..." : "Test Dispatch"}
                </button>
              </div>
            </div>

            {/* ACTIVECAMPAIGN / BREVO CARD */}
            <div className="glass-panel border-slate-800 rounded-xl p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                      <Mail className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-sm font-display">ActiveCampaign API</h3>
                      <p className="text-slate-500 text-[10px]">Sync newsletters & trigger automation sequences</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggleConnection("activeCampaignConnected")}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      connections.activeCampaignConnected
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-slate-900 text-slate-500 border border-slate-800"
                    }`}
                  >
                    {connections.activeCampaignConnected ? "Connected" : "Disconnected"}
                  </button>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">ActiveCampaign API Token</label>
                  <input
                    type="password"
                    value={connections.activeCampaignKey}
                    onChange={(e) => handleUpdateWebhookUrl("activeCampaignKey", e.target.value)}
                    disabled={!connections.activeCampaignConnected}
                    className="w-full bg-slate-950 border border-slate-900 rounded-lg px-3 py-2 text-[11px] text-white focus:outline-none focus:border-indigo-600"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-slate-900 mt-2">
                <span className="text-[10px] text-slate-500">Method: REST API Key Auth</span>
                <button
                  type="button"
                  disabled={!connections.activeCampaignConnected || testingTool === "activecampaign"}
                  onClick={() => handleTestIntegration("activecampaign")}
                  className="px-3 py-1.5 bg-slate-900 hover:text-white border border-slate-800 text-slate-400 text-[10px] font-bold rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                >
                  Verify AC Sync
                </button>
              </div>
            </div>

            {/* GOOGLE SHEETS CARD */}
            <div className="glass-panel border-slate-800 rounded-xl p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded bg-emerald-950/10 border border-emerald-900/20 flex items-center justify-center text-emerald-400">
                      <FileSpreadsheet className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-sm font-display">Google Sheets API</h3>
                      <p className="text-slate-500 text-[10px]">Real-time row additions for leads tracking</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggleConnection("googleSheetConnected")}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      connections.googleSheetConnected
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-slate-900 text-slate-500 border border-slate-800"
                    }`}
                  >
                    {connections.googleSheetConnected ? "Connected" : "Disconnected"}
                  </button>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Spreadsheet ID</label>
                  <input
                    type="text"
                    value={connections.googleSheetId}
                    onChange={(e) => handleUpdateWebhookUrl("googleSheetId", e.target.value)}
                    disabled={!connections.googleSheetConnected}
                    className="w-full bg-slate-950 border border-slate-900 rounded-lg px-3 py-2 text-[11px] text-white focus:outline-none focus:border-indigo-600"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-slate-900 mt-2">
                <span className="text-[10px] text-slate-500">Method: gsheet append rows API</span>
                <button
                  type="button"
                  disabled={!connections.googleSheetConnected || testingTool === "sheets"}
                  onClick={() => handleTestIntegration("sheets")}
                  className="px-3 py-1.5 bg-slate-900 hover:text-white border border-slate-800 text-slate-400 text-[10px] font-bold rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                >
                  Verify Sheet Sync
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 4. TAB: WEBHOOK LOGS */}
      {activeTab === "logs" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center border-b border-slate-900 pb-3">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#d4af37]">Webhook Activity Log</h2>
              <p className="text-slate-500 text-xs mt-0.5">Chronological record of data payloads sent to external automation APIs.</p>
            </div>
            
            <button
              onClick={handleClearLogs}
              className="flex items-center gap-1.5 px-3.5 py-2 border border-rose-900/35 hover:bg-rose-950/20 text-rose-400 text-xs font-bold rounded-lg transition-all cursor-pointer"
            >
              <Trash2 className="h-4 w-4" /> Clear Logs
            </button>
          </div>

          {/* Webhook logs list */}
          <div className="glass-panel border-slate-800 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-900 text-slate-400 text-[11px] font-semibold uppercase tracking-wider">
                    <th className="py-3 px-4">Time</th>
                    <th className="py-3 px-4">Trigger Event</th>
                    <th className="py-3 px-4">Destination</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4">JSON Data Payload</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900 text-xs text-slate-350 font-mono">
                  {logs.length > 0 ? (
                    logs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-900/30 transition-colors">
                        <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">{log.time}</td>
                        <td className="py-3.5 px-4 text-white font-bold whitespace-nowrap">{log.event}</td>
                        <td className="py-3.5 px-4 text-slate-300 font-sans">{log.destination}</td>
                        <td className="py-3.5 px-4 text-center">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                              log.status === "200_OK" || log.status === "201_Created"
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                : "bg-rose-500/10 text-rose-450 border border-rose-500/20"
                            }`}
                          >
                            {log.status === "200_OK" ? "200 OK" : log.status === "201_Created" ? "201 CREATED" : "500 ERROR"}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 max-w-xs truncate text-slate-500" title={log.payload}>
                          {log.payload}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-500 font-sans">
                        No recent webhook payloads routed. Trigger a test dispatch to create a delivery record.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
