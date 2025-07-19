<?php

namespace App\Models;

use Spatie\Activitylog\LogOptions;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;

class Attachment extends Model
{
    use LogsActivity;

    protected $fillable = [
        'name',
        'path',
        'size',
        'mime_type',
        'attachmentable_id',
        'attachmentable_type',
        'created_by',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    public function attachable()
    {
        return $this->morphedByMany(null, 'attachable');
    }
    
    /**
     * Get the activity log options for the User model.
     *
     * @return LogOptions
     */

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
        ->useLogName('Attachment')
        ->logOnlyDirty()
        ->logOnly([
        'name',
        'path',
        'size',
        'mime_type',
        'attachmentable_id',
        'attachmentable_type',
        'created_by',
        ]);
    }
}
