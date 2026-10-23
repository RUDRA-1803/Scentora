import React, { useState, useEffect } from 'react';
import { Activity, CheckCircle2, AlertCircle, RefreshCw, Server, Database } from 'lucide-react';
import { checkApiHealth } from '../../services/api';
import Button from '../common/Button';
import Badge from '../common/Badge';

export const ApiHealthStatus = () => {
  const [loading, setLoading] = useState(true);
  const [healthData, setHealthData] = useState(null);
  const [error, setError] = useState(null);
  const [lastChecked, setLastChecked] = useState(null);

  const fetchStatus = async () => {
    setLoading(true);
    setError(null);
    const result = await checkApiHealth();
    if (result.success) {
      setHealthData(result.data);
      setError(null);
    } else {
      setError(result.error);
      setHealthData(null);
    }
    setLastChecked(new Date().toLocaleTimeString());
    setLoading(false);
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <div className="bg-surface border border-themeBorder rounded-card p-6 shadow-card transition-colors duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-themeBorder gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-luxury bg-hoverSubtle text-accent border border-themeBorder">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-semibold text-content-primary">
              Backend API &amp; Server Health
            </h3>
            <p className="text-xs text-content-secondary">
              Live status ping to Express server endpoint <code className="px-1.5 py-0.5 rounded bg-hoverSubtle font-mono text-[11px]">GET /api/health</code>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {loading ? (
            <Badge variant="outline" size="sm">
              <RefreshCw className="w-3 h-3 mr-1.5 animate-spin" />
              Checking
            </Badge>
          ) : healthData ? (
            <Badge variant="success" size="sm">
              <CheckCircle2 className="w-3 h-3 mr-1.5" />
              Connected
            </Badge>
          ) : (
            <Badge variant="default" size="sm" className="text-amber-600 dark:text-amber-400 border-amber-500/30">
              <AlertCircle className="w-3 h-3 mr-1.5" />
              Server Offline
            </Badge>
          )}

          <Button
            variant="secondary"
            size="sm"
            onClick={fetchStatus}
            disabled={loading}
            title="Refresh API Health"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Server State */}
        <div className="p-4 rounded-luxury bg-hoverSubtle/50 border border-themeBorder/60">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-content-secondary font-medium">
              API Status
            </span>
            <Activity className="w-4 h-4 text-accent" />
          </div>
          <p className="text-sm font-semibold mt-1 text-content-primary">
            {healthData ? (
              <span className="text-emerald-600 dark:text-emerald-400 font-mono">
                {healthData.status?.toUpperCase() || 'OK'}
              </span>
            ) : (
              <span className="text-content-secondary">Offline / Unreachable</span>
            )}
          </p>
          <p className="text-[11px] text-content-secondary mt-1">
            {healthData?.message || error || 'Waiting for server to start'}
          </p>
        </div>

        {/* Database State */}
        <div className="p-4 rounded-luxury bg-hoverSubtle/50 border border-themeBorder/60">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-content-secondary font-medium">
              Database (MongoDB)
            </span>
            <Database className="w-4 h-4 text-brand-gold" />
          </div>
          <p className="text-sm font-semibold mt-1 text-content-primary">
            {healthData?.database ? (
              <span className="capitalize font-mono">
                {healthData.database.status}
              </span>
            ) : (
              <span className="text-content-secondary">Not Connected</span>
            )}
          </p>
          <p className="text-[11px] text-content-secondary mt-1">
            {healthData?.database?.message || 'Server resilient without DB'}
          </p>
        </div>

        {/* Uptime / Time */}
        <div className="p-4 rounded-luxury bg-hoverSubtle/50 border border-themeBorder/60">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-content-secondary font-medium">
              Last Verified
            </span>
            <span className="text-[11px] text-content-secondary font-mono">
              {lastChecked || 'Never'}
            </span>
          </div>
          <p className="text-sm font-semibold mt-1 text-content-primary font-mono">
            {healthData?.uptime ? `${Math.round(healthData.uptime)}s uptime` : '—'}
          </p>
          <p className="text-[11px] text-content-secondary mt-1">
            Environment: <code className="font-mono">{healthData?.environment || 'development'}</code>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApiHealthStatus;
