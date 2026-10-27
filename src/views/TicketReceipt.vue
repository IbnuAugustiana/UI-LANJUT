<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useEvents } from '@/composables/useEvents';
import AppCard from '@/components/ui/AppCard.vue';
import AppButton from '@/components/ui/AppButton.vue';

const route = useRoute();
const router = useRouter();
const { getRegistrationByEventId, getEventById } = useEvents();

// MENGAMBIL DATA TIKET BERDASARKAN EVENT ID DARI URL
const registration = computed(() => getRegistrationByEventId(route.params.id));
const event = computed(() => getEventById(route.params.id));

// CEK APAKAH EVENT SUDAH SELESAI
const isEventDone = computed(() => {
  return event.value ? event.value.done : false;
});
</script>

<template>
  <div class="ticket-receipt-page">
    <button class="btn-back" @click="router.push('/browse/your-events')">
      &larr; Back to Your Events
    </button>

    <!-- KONDISI TIKET DITEMUKAN -->
    <div v-if="registration" class="receipt-container">
      <AppCard class="receipt-card">
        <!-- HEADER RECEIPT -->
        <div class="receipt-header">
          <span :class="['lifecycle-badge', isEventDone ? 'badge-concluded' : 'badge-upcoming']">
            {{ isEventDone ? 'CONCLUDED' : 'UPCOMING' }}
          </span>
          <h1 class="receipt-title">Ticket Receipt</h1>
          <p class="receipt-subtitle">Official digital proof of registration for the event below.</p>
        </div>

        <!-- BOOKING CODE HIGHLIGHT -->
        <div class="booking-code-section">
          <span class="code-label">Booking Reference</span>
          <span class="code-value">{{ registration.bookingCode }}</span>
        </div>

        <!-- EVENT INFORMATION -->
        <div class="receipt-section">
          <h2 class="section-heading">Event Information</h2>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Event Name</span>
              <span class="info-value">{{ registration.eventTitle }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Category</span>
              <span class="info-value">{{ registration.eventCat }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Date &amp; Time</span>
              <span class="info-value">{{ registration.eventDate }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Venue / Location</span>
              <span class="info-value">{{ registration.eventLoc }}</span>
            </div>
          </div>
        </div>

        <!-- ATTENDEE INFORMATION -->
        <div class="receipt-section">
          <h2 class="section-heading">Attendee Information</h2>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Full Name</span>
              <span class="info-value">{{ registration.fullName }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Email Address</span>
              <span class="info-value">{{ registration.email }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Phone Number</span>
              <span class="info-value">{{ registration.phone }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Date of Birth</span>
              <span class="info-value">{{ registration.dob }}</span>
            </div>
          </div>
        </div>

        <!-- REASON FOR ATTENDING -->
        <div class="receipt-section">
          <h2 class="section-heading">Reason for Attending</h2>
          <p class="reason-text">{{ registration.reason }}</p>
        </div>

        <!-- REGISTRATION TIMESTAMP -->
        <div class="receipt-footer">
          <p class="timestamp">
            Registered on: {{ new Date(registration.registeredAt).toLocaleString('en-US', {
              dateStyle: 'long',
              timeStyle: 'short'
            }) }}
          </p>
          <p class="verification-note">
            This digital receipt serves as official proof of your registration. Please present this receipt or your booking reference code at the event venue for identity verification.
          </p>
        </div>

        <!-- ACTION BUTTONS -->
        <div class="receipt-actions">
          <button class="btn-secondary-action" @click="router.push('/browse/your-events')">
            Back to Your Events
          </button>
          <AppButton variant="primary" @click="router.push('/browse/events')">
            Browse More Events
          </AppButton>
        </div>
      </AppCard>
    </div>

    <!-- KONDISI 404: TIKET TIDAK DITEMUKAN -->
    <div v-else class="not-found-card">
      <span class="not-found-badge">NOT FOUND</span>
      <h2>Ticket Not Found</h2>
      <p>The ticket receipt you are looking for does not exist or the event has been removed from the system.</p>
      <AppButton variant="primary" @click="router.push('/browse/your-events')">
        Back to Your Events
      </AppButton>
    </div>
  </div>
</template>

<style scoped>
.ticket-receipt-page {
  padding-bottom: var(--space-12);
}

.btn-back {
  background: none;
  border: none;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-muted);
  cursor: pointer;
  padding: 0;
  margin-bottom: var(--space-6);
  display: inline-flex;
  align-items: center;
  transition: color 0.2s;
}

.btn-back:hover {
  color: var(--primary);
}

/* RECEIPT CONTAINER */
.receipt-container {
  max-width: 720px;
  margin: 0 auto;
}

.receipt-card {
  padding: var(--space-8);
  border: 1px solid var(--border-color);
  background: white;
  border-radius: var(--space-4);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}

/* HEADER */
.receipt-header {
  text-align: center;
  margin-bottom: var(--space-6);
  padding-bottom: var(--space-6);
  border-bottom: 1px solid var(--border-color);
}

.lifecycle-badge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: 50px;
  margin-bottom: var(--space-3);
}

.badge-upcoming {
  background: #dbeafe;
  color: #1d4ed8;
}

.badge-concluded {
  background: #f1f5f9;
  color: #64748b;
}

.receipt-title {
  font-size: 2rem;
  color: var(--text-main);
  margin-bottom: var(--space-2);
}

.receipt-subtitle {
  color: var(--text-muted);
  font-size: 0.95rem;
}

/* BOOKING CODE HIGHLIGHT */
.booking-code-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(102, 68, 255, 0.06);
  border: 1px solid rgba(102, 68, 255, 0.15);
  border-radius: 12px;
  padding: var(--space-6);
  margin-bottom: var(--space-6);
  text-align: center;
}

.code-label {
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  margin-bottom: var(--space-2);
}

.code-value {
  font-family: monospace;
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary);
  letter-spacing: 0.05em;
}

/* RECEIPT SECTIONS */
.receipt-section {
  margin-bottom: var(--space-6);
  padding-bottom: var(--space-6);
  border-bottom: 1px solid var(--border-color);
}

.section-heading {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: var(--space-4);
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info-label {
  font-size: 0.8rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.info-value {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-main);
}

.reason-text {
  font-size: 0.95rem;
  color: var(--text-muted);
  line-height: 1.7;
  background: var(--bg-light);
  padding: var(--space-4);
  border-radius: 8px;
  border: 1px solid var(--border-color);
  margin: 0;
}

/* RECEIPT FOOTER */
.receipt-footer {
  margin-bottom: var(--space-6);
  text-align: center;
}

.timestamp {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: var(--space-3);
  font-weight: 500;
}

.verification-note {
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.6;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 8px;
  padding: var(--space-3) var(--space-4);
  margin: 0;
}

/* ACTION BUTTONS */
.receipt-actions {
  display: flex;
  justify-content: center;
  gap: var(--space-4);
  padding-top: var(--space-6);
  border-top: 1px solid var(--border-color);
  flex-wrap: wrap;
}

.btn-secondary-action {
  background: var(--bg-light);
  border: 1px solid var(--border-color);
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  color: var(--text-muted);
  transition: all 0.2s;
}

.btn-secondary-action:hover {
  background: #e2e8f0;
  color: var(--text-main);
}

/* NOT FOUND STATE */
.not-found-card {
  text-align: center;
  padding: var(--space-12) var(--space-8);
  background: white;
  border-radius: var(--space-4);
  border: 1px solid var(--border-color);
  max-width: 540px;
  margin: var(--space-8) auto;
}

.not-found-badge {
  display: inline-block;
  background: var(--bg-light);
  color: var(--text-muted);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  padding: 4px 10px;
  border-radius: 50px;
  margin-bottom: var(--space-3);
}

.not-found-card h2 {
  font-size: 1.6rem;
  color: var(--text-main);
  margin-bottom: var(--space-2);
}

.not-found-card p {
  color: var(--text-muted);
  margin-bottom: var(--space-6);
  font-size: 0.95rem;
  line-height: 1.6;
}

@media (max-width: 600px) {
  .info-grid {
    grid-template-columns: 1fr;
  }

  .receipt-card {
    padding: var(--space-6);
  }

  .code-value {
    font-size: 1.5rem;
  }
}
</style>
