import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const RecommendationLetterManager = ({ recommendations, onSendInvitation, onResendReminder }) => {
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [inviteData, setInviteData] = useState({
    name: '',
    email: '',
    relationship: ''
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'submitted': return 'success';
      case 'invited': return 'warning';
      case 'pending': return 'muted';
      default: return 'muted';
    }
  };

  const handleInviteSubmit = (e) => {
    e?.preventDefault();
    onSendInvitation(inviteData);
    setInviteData({ name: '', email: '', relationship: '' });
    setShowInviteForm(false);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-md flex items-center justify-center">
            <Icon name="Mail" size={24} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground">
              Recommendation Letters
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground">
              {recommendations?.filter(r => r?.status === 'submitted')?.length} of {recommendations?.length} received
            </p>
          </div>
        </div>
        {!showInviteForm && (
          <Button
            variant="default"
            size="sm"
            iconName="Plus"
            iconPosition="left"
            onClick={() => setShowInviteForm(true)}
          >
            <span className="hidden sm:inline">Invite</span>
          </Button>
        )}
      </div>
      {showInviteForm && (
        <form onSubmit={handleInviteSubmit} className="bg-muted/50 rounded-lg p-4 mb-4 space-y-4">
          <h4 className="text-sm md:text-base font-heading font-semibold text-foreground">
            Send Invitation
          </h4>
          <Input
            label="Recommender Name"
            type="text"
            placeholder="Dr. John Smith"
            value={inviteData?.name}
            onChange={(e) => setInviteData({ ...inviteData, name: e?.target?.value })}
            required
          />
          <Input
            label="Email Address"
            type="email"
            placeholder="john.smith@university.edu"
            value={inviteData?.email}
            onChange={(e) => setInviteData({ ...inviteData, email: e?.target?.value })}
            required
          />
          <Input
            label="Relationship"
            type="text"
            placeholder="Professor, Advisor, Employer"
            value={inviteData?.relationship}
            onChange={(e) => setInviteData({ ...inviteData, relationship: e?.target?.value })}
            required
          />
          <div className="flex gap-2">
            <Button type="submit" variant="default" size="sm" fullWidth>
              Send Invitation
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              fullWidth
              onClick={() => setShowInviteForm(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
      <div className="space-y-3">
        {recommendations?.map((rec) => {
          const statusColor = getStatusColor(rec?.status);
          return (
            <div
              key={rec?.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 md:p-4 bg-muted/30 rounded-lg"
            >
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  statusColor === 'success' ? 'bg-success/10' :
                  statusColor === 'warning' ? 'bg-warning/10' : 'bg-muted'
                }`}>
                  <Icon
                    name={statusColor === 'success' ? 'CheckCircle' : 'User'}
                    size={20}
                    color={
                      statusColor === 'success' ? 'var(--color-success)' :
                      statusColor === 'warning' ? 'var(--color-warning)' : 'var(--color-muted-foreground)'
                    }
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="text-sm md:text-base font-medium text-foreground truncate">
                    {rec?.name}
                  </h5>
                  <p className="text-xs md:text-sm text-muted-foreground truncate">
                    {rec?.email}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {rec?.relationship}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:flex-col sm:items-end">
                <span className={`text-xs font-medium px-2 py-1 rounded-md whitespace-nowrap ${
                  statusColor === 'success' ? 'bg-success/10 text-success' :
                  statusColor === 'warning'? 'bg-warning/10 text-warning' : 'bg-muted text-muted-foreground'
                }`}>
                  {rec?.status}
                </span>
                {rec?.status === 'invited' && (
                  <Button
                    variant="ghost"
                    size="xs"
                    iconName="Send"
                    iconPosition="left"
                    onClick={() => onResendReminder(rec?.id)}
                  >
                    Remind
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecommendationLetterManager;