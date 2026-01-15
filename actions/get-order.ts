'use server';

interface GetOrderResponse {
  status: number;
  order?: any;
  error?: string;
}

/**
 * Server action to get order by ID
 * Supports payment ID, Stripe session ID, or MongoDB _id
 */
export async function getOrderById(identifier: string): Promise<GetOrderResponse> {
  try {
    if (!identifier || identifier === 'undefined' || identifier === 'null') {
      return {
        status: 400,
        error: 'Invalid order identifier',
      };
    }

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || 'http://localhost:5000';
    
    const response = await fetch(`${backendUrl}/api/orders/${identifier}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Always fetch fresh data
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Failed to fetch order' }));
      return {
        status: response.status,
        error: errorData.error || 'Failed to fetch order',
      };
    }

    const data = await response.json();

    if (data.success && data.order) {
      return {
        status: 200,
        order: data.order,
      };
    }

    return {
      status: 404,
      error: 'Order not found',
    };
  } catch (error) {
    console.error('Error fetching order:', error);
    return {
      status: 500,
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

